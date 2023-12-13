import { Injectable } from '@nestjs/common'
import { DeleteFileDTO } from './dto/deleteFile.dto'
import { Model } from 'mongoose'
import { News } from '../news/schemas/news.schema'
import { InjectModel } from '@nestjs/mongoose'
import { deleteFile } from 'src/utils/deleteFile'
import { IFileData } from './interfaces/IFileData'
import { checklFile } from 'src/utils/checkFile'
import { deleteFileFromDatabase } from 'src/utils/deleteFileFromDatabase'

@Injectable()
export class FilesService {
    constructor(
        @InjectModel(News.name)
        private readonly newsModel: Model<News>,
    ) {}

    async deleteFileFromDb(fileData: DeleteFileDTO) {
        try {
            const news = await this.newsModel.findById(fileData.newsId)

            if (!news) {
                throw Error('Статьи не существует')
            }

            const updatedFiles = [...news.files].filter(
                (file) => file.name !== fileData.fileName,
            )

            news.files = updatedFiles

            const updatedNews = await news.save()

            return updatedNews.files
        } catch (err) {
            return err
        }
    }

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
        const fileExist = await checklFile('../../uploads/' + fileName)

        if (!fileExist) {
            return await this.deleteFileFromDb(fileData)
        }

        const isDelete = await deleteFile('../../uploads/' + fileName)

        if (!isDelete.delete) {
            return new Error('Ошибка удаления файла')
        }
        return await this.deleteFileFromDb(fileData)
        // return await deleteFileFromDatabase(fileData)
    }
}
