import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    UseInterceptors,
    Res,
    UploadedFile,
    HttpStatus,
    Req,
} from '@nestjs/common'
import { FilesService } from './files.service'
import { ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { storageConfiguration } from 'src/configuration/storageConfiguration'
import { Request, Response } from 'express'
import { DeleteFileDTO } from './dto/deleteFile.dto'
import { IFileData } from './interfaces/IFileData'
import { Express } from 'express'
import * as path from 'path'

@ApiTags('files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post(':id')
    @UseInterceptors(FileInterceptor('file', storageConfiguration))
    async uploadFile(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') id: string,
        @UploadedFile()
        file: Express.Multer.File,
    ) {
        try {
            const url = req.protocol + '://' + req.get('Host') + '/'

            const fileData: IFileData = {
                newsId: id,
                name: file.filename,
                href: url + file.filename,
                data: file.path,
                extension: path.parse(file.originalname).ext,
            }

            const dataUpload = await this.filesService.uploadFile(fileData)

            return res.status(HttpStatus.OK).json({
                fileData: dataUpload,
            })
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Ошибка добавления файла',
                err: err,
            })
        }
    }

    @Delete()
    async removeFile(@Res() res: Response, @Body() fileData: DeleteFileDTO) {
        try {
            const files = await this.filesService.removeFile(fileData)

            res.status(HttpStatus.OK).json({ fileData: files })
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error delete file',
                ...error,
            })
        }
    }
}
