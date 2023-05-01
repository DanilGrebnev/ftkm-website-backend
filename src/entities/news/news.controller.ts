import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Body,
    Query,
    Req,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { FileService } from '../file/file.service'

import { FileImageDto } from '../file/dto/FIleImage.dto'

import { NewsService } from './news.service'

import { NewsDTO } from './dto/news.dto'

import { ValidateObjectId } from './shared/validate-id.pipes'

import { FileType } from '../file/file.service'

//Imports swagger responses
import { NewsResponseDTO, GetOneNewsDTO } from './swaggerResponse/news.response'
import { FileInterceptor } from '@nestjs/platform-express'

import {
    ApiTags,
    ApiBody,
    ApiResponse,
    ApiOkResponse,
    ApiQuery,
    ApiConsumes,
} from '@nestjs/swagger'

//Controller API news
@ApiTags('news')
@Controller('news')
export class NewsController {
    constructor(
        private NewsService: NewsService,
        private FileService: FileService,
    ) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'return all news',
        type: [NewsResponseDTO],
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'error get news',
    })
    @ApiQuery({
        name: 'limit',
        required: true,
        type: Number,
    })
    @ApiQuery({
        name: 'skip',
        required: true,
        type: Number,
    })
    async getNews(
        @Res() res: Response,
        @Query('limit') limit: string,
        @Query('skip') skip: string,
    ) {
        try {
            const { news, countDocuments } = await this.NewsService.getNews(
                limit,
                skip,
            )
            // header('X-Total-Count', countDocuments.toString())
            return res
                .status(HttpStatus.OK)
                .header('X-Total-Count', countDocuments.toString())
                .json(news)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Ошибка получения новостей',
            })
        }
    }

    @Get('lastDoc')
    async getLastNews(@Res() res: Response, @Query('limit') limit: number) {
        const news = await this.NewsService.getLastNews(limit)

        return res.json(news).status(HttpStatus.OK)
    }

    @Get(':newsID')
    @ApiResponse({
        status: 200,
        description: 'return one news',
        type: GetOneNewsDTO,
    })
    async getOneNews(@Res() res: Response, @Param('newsID') newsID: string) {
        const oneNews = await this.NewsService.getOneNews(newsID)

        if (!oneNews) {
            throw new NotFoundException('News does not exist!')
        }

        return res.status(HttpStatus.OK).json(oneNews)
    }

    @Post()
    @ApiOkResponse({ type: NewsResponseDTO })
    async addNews(@Res() res: Response, @Body() NewsDTO: NewsDTO) {
        const news = await this.NewsService.addNews(NewsDTO)

        return res.status(HttpStatus.OK).json(news)
    }

    @Post('uploadImage')
    @ApiBody({
        description: 'Preview image',
        type: FileImageDto,
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('img'))
    async createImage(@UploadedFile() img: Express.Multer.File) {
        const imgName = this.FileService.createFile(FileType.IMAGE, img)

        return imgName
    }

    @Put('removeImg')
    async removeImage(
        @Query('imgName') imgName: string,
        @Query('newsID') newsID: string,
        @Res() res: Response,
    ) {
        this.FileService.removeFile(imgName)

        const news = await this.NewsService.getOneNews(newsID)

        news.imgName = ''

        const newNews = await this.NewsService.editNews(newsID, news)

        res.status(200).json(newNews)
    }

    @Put(':newsID')
    @ApiBody({ type: NewsDTO })
    @ApiOkResponse({ type: NewsResponseDTO })
    @UseInterceptors(FileInterceptor('img'))
    async editNews(
        @Res() res: Response,
        @Param('newsID', new ValidateObjectId()) newsID: string,
        @Body() NewsDTO: NewsDTO,
        @Query() fileName: string,
        @UploadedFile() img: Express.Multer.File,
    ) {
        const serviceRes = await this.NewsService.editNews(newsID, NewsDTO)

        return res.json(serviceRes)
    }

    @Delete(':newsID')
    async deleteNews(
        @Res() res: Response,
        @Param('newsID', new ValidateObjectId()) newsID: string,
    ) {
        const response = this.NewsService.deleteNews(newsID)

        return res.status(HttpStatus.OK).json(response)
    }
}
