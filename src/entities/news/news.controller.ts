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
    async getLastNews(@Query('limit') limit: number) {
        return await this.NewsService.getLastNews(limit)
    }

    @Get(':newsID')
    @ApiResponse({
        status: 200,
        description: 'return one news',
        type: GetOneNewsDTO,
    })
    async getOneNews(@Param('newsID') newsID: string) {
        return await this.NewsService.getOneNews(newsID)
    }

    @Post()
    @ApiOkResponse({ type: NewsResponseDTO })
    async addNews(@Body() NewsDTO: NewsDTO) {
        return await this.NewsService.addNews(NewsDTO)
    }

    @Put(':newsID')
    @ApiBody({ type: NewsDTO })
    @ApiOkResponse({ type: NewsResponseDTO })
    @UseInterceptors(FileInterceptor('img'))
    async editNews(
        @Param('newsID', new ValidateObjectId()) newsID: string,
        @Body() NewsDTO: NewsDTO,
    ) {
        return await this.NewsService.editNews(newsID, NewsDTO)
    }

    @Delete(':newsID')
    async deleteNews(@Param('newsID', new ValidateObjectId()) newsID: string) {
        return this.NewsService.deleteNews(newsID)
    }
}
