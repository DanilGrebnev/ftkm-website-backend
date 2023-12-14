import { Injectable, NotFoundException } from '@nestjs/common'
import { DeleteFileDTO } from './dto/deleteFile.dto'
import { Model } from 'mongoose'
import { News } from '../news/schemas/news.schema'
import { InjectModel } from '@nestjs/mongoose'
import { deleteFile } from 'src/utils/deleteFile'
import { checklFile } from 'src/utils/checkFile'
import { pathToUploads } from 'src/configuration/storageConfiguration'
import { deleteFileFromDB } from 'src/utils/deleteFileFromDB'
import { FileDTO } from './dto/file.dto'

@Injectable()
export class FilesService {
    constructor(
        @InjectModel(News.name)
        private readonly newsModel: Model<News>,
    ) {}

    async uploadFile(fileData: FileDTO) {
        const news = await this.newsModel.findById(fileData.newsId)

        news.files.push(fileData)

        const updatedNews = await news.save()

        return updatedNews.files
    }

    async removeFile(fileData: DeleteFileDTO) {
        const { fileName, newsId } = fileData

        const pathToFile = pathToUploads + fileName

        const news = await this.newsModel.findById(newsId)

        if (!news) {
            throw new NotFoundException({
                mewssage: 'Данной статьи не существует',
            })
        }

        // Проверяет наличие файла на диске
        const fileOnDrive = await checklFile(pathToFile)

        // Если файла на диске нет, удаляем запись о файле из
        // бд и возвращаем изменённую бд
        if (!fileOnDrive) {
            const updatedNews = await deleteFileFromDB({
                document: news,
                fileName,
            })
            return updatedNews.files
        }

        const isDelete = await deleteFile(pathToFile)

        if (!isDelete.delete) {
            return []
        }
        const updatedNews = await deleteFileFromDB({
            document: news,
            fileName,
        })

        return updatedNews.files
    }
}
