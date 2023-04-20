import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { INews } from './interfaces/news.interface'
import { CreateNewsDTO } from './dto/create-news.dto'

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

    async addNews(CreateNewsDTO: CreateNewsDTO): Promise<INews> {
        const newNews = new this.newsModel(CreateNewsDTO)

        return await newNews.save()
    }

    async editNews(newsID: string, createNewsDTO: CreateNewsDTO): Promise<INews> {
        const editNews = await this.newsModel.findByIdAndUpdate(newsID, createNewsDTO, {
            new: true,
        })
        return editNews
    }

    async deleteNews(newsID: string) {
        const deletedNews = await this.newsModel.findByIdAndDelete(newsID)

        return deletedNews
    }
}
