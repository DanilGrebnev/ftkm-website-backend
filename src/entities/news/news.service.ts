import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { NewsDTO } from './dto/news.dto'
import { News } from './schemas/news.schema'

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
        const countDocument = await this.newsModel.countDocuments()

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

    async addNews(NewsDTO: NewsDTO): Promise<News> {
        try {
            const newNews = new this.newsModel(NewsDTO)

            return await newNews.save()
        } catch (error) {
            return error
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
        const deletedNews = await this.newsModel.findByIdAndDelete(newsID)

        return deletedNews
    }
}
