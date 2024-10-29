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

import { CreateNewsDTO, NewsDTO, ResponseNewsDTO, UpdateNewsDTO } from './news.dto'

import { ValidateObjectId } from './shared/validate-id.pipes'

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
        type: [ResponseNewsDTO],
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

    @Get(':newsId')
    @ApiResponse({
        status: 200,
        description: 'return one news',
        type: ResponseNewsDTO,
    })
    async getOneNews(@Param('newsId') newsId: string) {
        return await this.NewsService.getOneNews(newsId)
    }

    @Post()
    @ApiBody({ type: CreateNewsDTO, description: 'Body data' })
    @ApiOkResponse({ type: ResponseNewsDTO })
    async addNews(@Body() NewsDTO: NewsDTO) {
        return await this.NewsService.addNews(NewsDTO)
    }

    @Put(':newsId')
    @ApiBody({ type: UpdateNewsDTO, description: 'Body data' })
    @ApiOkResponse({ type: ResponseNewsDTO })
    @UseInterceptors(FileInterceptor('img'))
    async editNews(
        @Param('newsId', new ValidateObjectId()) newsId: string,
        @Body() NewsDTO: NewsDTO,
    ) {
        return await this.NewsService.editNews(newsId, NewsDTO)
    }

    @Delete(':newsId')
    async deleteNews(@Param('newsId', new ValidateObjectId()) newsId: string) {
        return this.NewsService.deleteNews(newsId)
    }
}
