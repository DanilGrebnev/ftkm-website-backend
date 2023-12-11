import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import { v4 as uuid } from 'uuid'

export enum FileType {
    IMAGE = 'image',
    // PDF = 'pdf',
}

@Injectable()
export class FileService {
    createFile(type: FileType, file: Express.Multer.File) {
        try {
            if (!file) return

            const fileExtends = '.' + file.mimetype.split('/').pop()

            const fileName = uuid() + fileExtends

            const filePath = path.resolve(
                __dirname,
                '..',
                '..',
                `static/${type}`,
            )

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }

            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return type + '/' + fileName
        } catch (err) {
            console.log(err)

            throw new HttpException(
                err.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }

    removeFile(fileName: string) {
        try {
            const filePath = path.resolve(
                __dirname,
                '..',
                '..',
                `static/${fileName}`,
            )

            fs.unlinkSync(filePath)

            return { message: 'Файл удалён', ok: true }
        } catch (err) {
            console.log(err)

            return { message: 'Ошибка удаления файла', ok: false }
        }
    }

    checkFile(fileName: string) {
        try {
            const filePath = path.resolve(
                __dirname,
                '..',
                '..',
                `static/${fileName}`,
            )

            fs.accessSync(filePath)

            return true
        } catch (err) {
            return false
        }
    }
}
