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
import { ApiTags } from '@nestjs/swagger'

//Контроллер API новостей news
@ApiTags('news')
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
            news: newNews,
        })
    }

    @Put(':newsID')
    async editNews(
        @Res() res: Response,
        @Param('newsID', new ValidateObjectId()) newsID: string,
        @Body() CreateNewsDTO: CreateNewsDTO,
    ) {
        const serviceRes = await this.NewsService.editNews(newsID, CreateNewsDTO)

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
