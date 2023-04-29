import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Express } from 'express'
import * as path from 'path'
import * as fs from 'fs'
import { v4 as uuid } from 'uuid'

export enum FileType {
    IMAGE = 'image',
}

@Injectable()
export class FileService {
    createFile(type: FileType, file: Express.Multer.File) {
        try {
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

    removeFile(fileName: string) {}
}
