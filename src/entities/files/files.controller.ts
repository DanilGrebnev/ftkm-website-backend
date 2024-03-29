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
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { storageConfiguration } from 'src/configuration/storageConfiguration'
import { Request, Response } from 'express'
import { DeleteFileDTO } from './dto/deleteFile.dto'
import { Express } from 'express'
import * as path from 'path'
import { FileDTO } from './dto/file.dto'

@ApiTags('files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post(':id')
    @ApiResponse({
        status: 200,
        description: 'Return all files after upload',
        type: [FileDTO],
    })
    @UseInterceptors(FileInterceptor('file', storageConfiguration))
    async uploadFile(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') id: string,
        @UploadedFile()
        file: Express.Multer.File,
    ) {
        try {
            const fileData: FileDTO = {
                newsId: id,
                name: file.filename,
                data: file.path,
                extension: path.parse(file.originalname).ext,
            }

            const uploadFiles = await this.filesService.uploadFile(fileData)

            return res.status(HttpStatus.OK).json(uploadFiles)
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Ошибка добавления файла',
                err: err,
            })
        }
    }

    @Delete()
    @ApiResponse({
        status: 200,
        description: 'Return all files after remove',
        type: [FileDTO],
    })
    async removeFile(@Body() fileData: DeleteFileDTO) {
        return await this.filesService.removeFile(fileData)
    }
}
