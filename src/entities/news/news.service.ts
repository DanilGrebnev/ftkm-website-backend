import { HttpException, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { NewsDTO } from './news.dto'
import { News } from './schemas/news.schema'
import { deleteFile } from 'src/utils/deleteFile'

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

    async getFilteredNews(
        limit: string,
        skip: string,
        title: string,
    ): Promise<{ news: News[]; countDocuments: number }> {
        const filter = { title: { $regex: new RegExp(title, 'i') } }

        const news = await this.newsModel
            .find(filter)
            .sort({ _id: -1 })
            .limit(+limit)
            .skip(+skip)
            .exec()

        const countDocuments = await this.newsModel
            .find(filter)
            .countDocuments()
            .exec()

        return { news, countDocuments }
    }

    async getLastNews(lastDocCount: number): Promise<News[]> {
        // const countDocument = await this.newsModel.countDocuments()

        const news = await this.newsModel
            .find()
            .sort({ _id: -1 })
            .limit(+lastDocCount)
            .exec()

        return news
    }

    async getOneNews(newsID: string): Promise<News> {
        const oneNews = await this.newsModel.findById(newsID).exec()

        return oneNews
    }

    async addNews(NewsDTO: NewsDTO): Promise<News | { error: any }> {
        try {
            const newNews = new this.newsModel(NewsDTO)

            const response = await newNews.save()

            return response
        } catch (err) {
            throw new HttpException('Ошибка отправки', 401)
        }
    }

    async editNews(newsID: string, NewsDTO: NewsDTO): Promise<News | any> {
        try {
            const editNews = await this.newsModel.findByIdAndUpdate(
                newsID,
                NewsDTO,
                {
                    new: true,
                    upsert: true,
                },
            )

            return editNews
        } catch (error) {
            return error
        }
    }

    async deleteNews(newsID: string) {
        const news = await this.newsModel.findById(newsID)

        const deletedNews = await this.newsModel.findByIdAndDelete(newsID)

        //Удаляем все файлы, связанные с новостью
        await Promise.allSettled(
            news.files.map((file) => {
                return deleteFile('../../uploads/' + file.name)
            }),
        )

        return deletedNews
    }
}
