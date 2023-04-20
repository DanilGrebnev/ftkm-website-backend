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
import { NewsDTO } from './dto/news.dto'
import { ValidateObjectId } from './shared/validate-id.pipes'
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger'

//Контроллер API новостей news
@ApiTags('news')
@Controller('news')
export class NewsController {
    constructor(private NewsService: NewsService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'return all news',
        type: [NewsDTO],
    })
    async getNews(@Res({ passthrough: true }) res: Response) {
        const news = await this.NewsService.getNews()

        return res.status(HttpStatus.OK).json(news)
    }

    @Get(':newsID')
    @ApiResponse({
        status: 200,
        description: 'return one news',
        type: NewsDTO,
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
    @ApiBody({ type: NewsDTO })
    async addNews(@Res() res: Response, @Body() NewsDTO: NewsDTO) {
        const newNews = await this.NewsService.addNews(NewsDTO)

        return res.status(HttpStatus.OK).json({
            news: newNews,
        })
    }

    @Put(':newsID')
    @ApiBody({ type: NewsDTO })
    async editNews(
        @Res() res: Response,
        @Param('newsID', new ValidateObjectId()) newsID: string,
        @Body() NewsDTO: NewsDTO,
    ) {
        const serviceRes = await this.NewsService.editNews(newsID, NewsDTO)

        if (!serviceRes) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ошибка обновления статьи' })
        }

        return res.status(HttpStatus.OK).json(serviceRes)
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
