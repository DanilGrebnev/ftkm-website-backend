import { pathToUploads } from '../../configuration/storageConfiguration'
import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { NewsDTO } from './news.dto'
import { News } from './schemas/news.schema'
import { deleteFile } from 'src/utils/deleteFile'
import { checklFile } from 'src/utils/checkFile'
import { deleteFileFromDB } from 'src/utils/deleteFileFromDB'
import { QueryFilters } from './shared/types'
import { createFilters } from './shared/lib/createFilters'

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News.name)
        private readonly newsModel: Model<News>,
    ) {}

    async getNews(
        limit: string,
        skip: string,
        filters?: QueryFilters,
    ): Promise<{ news: News[]; countDocuments: number }> {
        const filter = createFilters(filters)

        const newsPromise = this.newsModel
            .find(filter)
            .sort({ _id: -1 })
            .limit(+limit)
            .skip(+skip)
            .exec()

        const countDocumentsPromise = this.newsModel
            .find()
            .countDocuments()
            .exec()

        const [news, countDocuments] = await Promise.all([
            newsPromise,
            countDocumentsPromise,
        ])

        return { news, countDocuments }
    }

    async getOneNews(newsID: string): Promise<News | any> {
        const news = await this.newsModel.findById(newsID).exec()

        if (!news) {
            throw new NotFoundException('Статья не найдена')
        }
        /**
         * Если у новости нет файлов, то сразу возвращаем новость
         */
        if (!news.files.length) return news

        /**
         * Перед тем, как отдать пользователю новость,
         * происходит проверка наличия файлов.
         * Если файлы на диске отсутствуют, то произойдёт
         * удаление записи о файле из базы данных
         */
        const filesName = news.files.map((file) => file.name)

        for await (const fileName of filesName) {
            const onDrive = await checklFile(pathToUploads + fileName)
            if (!onDrive) {
                await deleteFileFromDB({ document: news, fileName })
            }
        }

        return news
    }

    async addNews(NewsDTO: NewsDTO): Promise<News | { error: any }> {
        try {
            const newNews = new this.newsModel(NewsDTO)

            return await newNews.save()
        } catch (err) {
            throw new HttpException('Ошибка отправки', 401)
        }
    }

    async editNews(newsID: string, NewsDTO: NewsDTO): Promise<News | any> {
        const news = await this.newsModel.findById(newsID)

        if (!news) {
            throw new HttpException(
                'Ошибка редактирования, статьи не существует.',
                HttpStatus.NOT_FOUND,
            )
        }

        const editNews = await this.newsModel.findByIdAndUpdate(
            newsID,
            NewsDTO,
            {
                new: true,
                upsert: true,
            },
        )

        return editNews
    }

    async deleteNews(newsID: string) {
        const news = await this.newsModel.findById(newsID)

        if (!news) {
            throw new HttpException(
                { message: 'Статья не найдена' },
                HttpStatus.NOT_FOUND,
            )
        }

        //Удаляем все файлы, связанные с новостью
        await Promise.allSettled(
            news?.files.map((file) => {
                return deleteFile(pathToUploads + file.name)
            }),
        )

        const deletedNews = await this.newsModel.findByIdAndDelete(newsID)

        return deletedNews
    }
}
