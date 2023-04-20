import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { INews } from './interfaces/news.interface'
import { NewsDTO } from './dto/news.dto'

@Injectable()
export class NewsService {
    constructor(
        @InjectModel('News')
        private readonly newsModel: Model<INews>,
    ) {}

    async getNews(): Promise<INews[]> {
        const posts = await this.newsModel.find().exec()

        return posts
    }

    async getOneNews(newsID: string): Promise<INews> {
        const oneNews = await this.newsModel.findById(newsID).exec()

        return oneNews
    }

    async addNews(NewsDTO: NewsDTO): Promise<INews> {
        try {
            const newNews = new this.newsModel(NewsDTO)

            return await newNews.save()
        } catch (error) {
            return error
        }
    }

    async editNews(newsID: string, NewsDTO: NewsDTO): Promise<INews | any> {
        try {
            const editNews = await this.newsModel.findByIdAndUpdate(newsID, NewsDTO, {
                new: true,
                upsert: true,
            })

            console.log(editNews)

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
