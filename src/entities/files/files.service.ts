import { Injectable } from '@nestjs/common'
import { DeleteFileDTO } from './dto/deleteFile.dto'
import { Model } from 'mongoose'
import { News } from '../news/schemas/news.schema'
import { InjectModel } from '@nestjs/mongoose'
import { deleteFile } from 'src/utils/deleteFile'
import { IFileData } from './interfaces/IFileData'

@Injectable()
export class FilesService {
    constructor(
        @InjectModel(News.name)
        private readonly newsModel: Model<News>,
    ) {}

    async uploadFile(fileData: IFileData) {
        try {
            const news = await this.newsModel.findById(fileData.newsId)
            news.files.push(fileData)
            const updatedNews = await news.save()

            return updatedNews.files
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async removeFile(fileData: DeleteFileDTO) {
        const { fileName } = fileData
        const isDelete = await deleteFile('../../uploads/' + fileName)

        if (!isDelete.delete) {
            throw Error('Ошибка удаления файла')
        }

        const news = await this.newsModel.findById(fileData.newsId)

        if (!news) {
            throw Error('Статьи не существует')
        }

        const updatedFiles = [...news.files].filter(
            (file) => file.name !== fileName,
        )

        news.files = updatedFiles

        const updatedNews = await news.save()

        return updatedNews.files
    }
}
