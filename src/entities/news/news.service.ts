import { pathToUploads } from './../../configuration/storageConfiguration'
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
import { Response } from 'express'

@Injectable()
export class NewsService {
    constructor(
        @InjectModel(News.name)
        private readonly newsModel: Model<News>,
    ) {}

    async getNews(
        limit: string,
        skip: string,
    ): Promise<{ news: News[]; countDocuments: number }> {
        const news = await this.newsModel
            .find()
            .sort({ _id: -1 })
            .limit(+limit)
            .skip(+skip)
            .exec()

        const countDocuments = await this.newsModel
            .find()
            .countDocuments()
            .exec()

        return { news, countDocuments }
    }

    async getLastNews(lastDocCount: number): Promise<News[]> {
        const news = await this.newsModel
            .find()
            .sort({ _id: -1 })
            .limit(+lastDocCount)
            .exec()

        return news
    }

    async getOneNews(newsID: string): Promise<News | any> {
        const oneNews = await this.newsModel.findById(newsID).exec()

        if (!oneNews) {
            throw new NotFoundException({ message: 'Статья не найдена' })
        }
        /**
         * Если у новости нет файлов, то сразу возвращаем новость
         */
        if (!oneNews.files.length) return oneNews

        /**
         * Перед тем, как отдать пользователю новость,
         * происходит проверка наличия файлов из статьи.
         * Если файлы на диске отсутствуют, то произойдёт
         * удаление записи о файле из базы данных
         */
        const filesName = oneNews.files.map((file) => file.name)

        const checkfilePromises = filesName.map(async (name) => {
            const onDisk = await checklFile(pathToUploads + name)

            if (!onDisk) {
                const newFileList = oneNews.files.filter(
                    (file) => file.name !== name,
                )

                oneNews.files = newFileList

                await oneNews.save()
            }
        })

        await Promise.allSettled(checkfilePromises)

        return oneNews
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
                {
                    message: 'Ошибка редактирования, статьи не существует.',
                },
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
