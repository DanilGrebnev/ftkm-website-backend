import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Res,
    HttpStatus,
    Param,
    Body,
    Query,
    UseInterceptors,
} from '@nestjs/common'
import { Response } from 'express'

import { NewsService } from './news.service'

import { NewsDTO } from './news.dto'

import { ValidateObjectId } from './shared/validate-id.pipes'

import { NewsResponseDTO, GetOneNewsDTO } from './swaggerResponse/news.response'
import { FileInterceptor } from '@nestjs/platform-express'

import {
    ApiTags,
    ApiBody,
    ApiResponse,
    ApiOkResponse,
    ApiQuery,
} from '@nestjs/swagger'

//Controller API news
@ApiTags('news')
@Controller('news')
export class NewsController {
    constructor(private NewsService: NewsService) {}

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
        try {
            const oneNews = await this.NewsService.getOneNews(newsID)

            return res.status(HttpStatus.OK).json(oneNews)
        } catch (err) {
            console.log(err)
            return res.status(HttpStatus.BAD_REQUEST)
        }
    }

    @Post()
    @ApiOkResponse({ type: NewsResponseDTO })
    async addNews(@Res() res: Response, @Body() NewsDTO: NewsDTO) {
        const response = await this.NewsService.addNews(NewsDTO)

        return res.status(HttpStatus.OK).json(response)
    }

    @Put(':newsID')
    @ApiBody({ type: NewsDTO })
    @ApiOkResponse({ type: NewsResponseDTO })
    @UseInterceptors(FileInterceptor('img'))
    async editNews(
        @Res() res: Response,
        @Param('newsID', new ValidateObjectId()) newsID: string,
        @Body() NewsDTO: NewsDTO,
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
