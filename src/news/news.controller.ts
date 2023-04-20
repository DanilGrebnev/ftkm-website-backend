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
} from '@nestjs/common'
import { Request, Response } from 'express'
import { NewsService } from './news.service'
import { CreateNewsDTO } from './dto/create-news.dto'
import { ValidateObjectId } from './shared/validate-id.pipes'

@Controller('news')
export class NewsController {
    constructor(private NewsService: NewsService) {}

    @Get()
    async getNews(@Res({ passthrough: true }) res: Response) {
        const news = await this.NewsService.getNews()

        return res.status(HttpStatus.OK).json(news)
    }

    @Get(':newsID')
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
    async addNews(@Res() res: Response, @Body() CreateNewsDTO: CreateNewsDTO) {
        const newNews = await this.NewsService.addNews(CreateNewsDTO)

        return res.status(HttpStatus.OK).json({
            message: 'Post has been submitted successfully!',
            news: newNews,
        })
    }
}
