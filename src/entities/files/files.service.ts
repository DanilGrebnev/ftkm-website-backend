import { Injectable } from '@nestjs/common'
import { DeleteFileDTO } from './dto/deleteFile.dto'
import { Model } from 'mongoose'
import { News } from '../news/schemas/news.schema'
import { InjectModel } from '@nestjs/mongoose'
import { NewsDTO } from '../news/news.dto'

import * as fs from 'fs'
import * as path from 'path'

interface IFileData {
    newsId: string
    name: string
    href: string
    data: string
}

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
            await news.save()
            return { succes: 'true' }
        } catch (err) {
            console.log(err)
            return err
        }
    }

    findFilesByUserId(id: number) {
        return `This action returns a #${id} file`
    }

    update(id: number, updateFileDto) {
        return `This action updates a #${id} file`
    }

    async removeFile(fileData: DeleteFileDTO) {
        const { fileName } = fileData
        try {
            const response = await new Promise((resolve, reject) => {
                fs.unlink(
                    path.resolve(__dirname, '../../../uploads/' + fileName),
                    (err) => {
                        if (err) {
                            console.log(err)
                            reject({ error: err, message: 'Error delete file' })
                        } else {
                            resolve({
                                succes: true,
                                message: 'file: ' + fileName + ' deleted',
                            })
                        }
                    },
                )
            })

            const news = await this.newsModel.findById(fileData.newsId)

            news.files.filter((file) => {
                file.name !== fileName
            })

            await news.save()

            return response
        } catch (err) {
            console.log(err)
            return err
        }
    }
}
