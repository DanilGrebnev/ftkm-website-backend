import { NewsSchema } from 'src/entities/news/schemas/news.schema'
import * as mongoose from 'mongoose'
import { DeleteFileDTO } from 'src/entities/files/dto/deleteFile.dto'

const newsModel = mongoose.model('News', NewsSchema)

export const deleteFileFromDatabase = async (fileData: DeleteFileDTO) => {
    try {
        const news = await newsModel.findById(fileData.newsId)
        console.log('Вызвана функция deleteFileFromDatabase')
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
        console.log(err)
    }
}
