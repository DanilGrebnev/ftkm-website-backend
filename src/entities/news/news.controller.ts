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
} from '@nestjs/common'
import { Request, Response } from 'express'
import { NewsService } from './news.service'
import { NewsDTO } from './dto/news.dto'
import { ValidateObjectId } from './shared/validate-id.pipes'
import {
    NewsResponse,
    GetOneNewsResponse,
} from './swaggerResponse/news.response'

import {
    ApiTags,
    ApiBody,
    ApiResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiQuery,
} from '@nestjs/swagger'

//Imports swagger responses

//Controller API news
@ApiTags('news')
@Controller('news')
export class NewsController {
    constructor(private NewsService: NewsService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'return all news',
        type: [NewsResponse],
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
        const news = await this.NewsService.getNews(limit, skip)

        return res.status(HttpStatus.OK).json(news)
    }

    @Get(':newsID')
    @ApiResponse({
        status: 200,
        description: 'return one news',
        type: GetOneNewsResponse,
    })
    async getOneNews(
        @Res() res: Response,
        @Param('newsID', new ValidateObjectId()) newsID: string,
    ) {
        const oneNews = await this.NewsService.getOneNews(newsID)

        if (!oneNews) {
            throw new NotFoundException('News does not exist!')
        }

        return res.status(HttpStatus.OK).json(oneNews)
    }

    @Post()
    @ApiOkResponse({ type: NewsResponse })
    async addNews(@Res() res: Response, @Body() NewsDTO: NewsDTO) {
        const newNews = await this.NewsService.addNews(NewsDTO)

        return res.status(HttpStatus.OK).json({
            news: newNews,
        })
    }

    @Put(':newsID')
    @ApiBody({ type: NewsDTO })
    @ApiOkResponse({ type: NewsResponse })
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
