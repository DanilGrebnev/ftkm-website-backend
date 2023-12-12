import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
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
        file,
    ) {
        try {
            const url = req.protocol + '://' + req.get('Host') + '/'

            const fileData = {
                newsId: id,
                name: file.filename,
                href: url + file.filename,
                data: file.path,
            }

            await this.filesService.uploadFile(fileData)

            return res.status(HttpStatus.OK).json({
                message: 'Файл успешно записан',
            })
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Ошибка добавления файла',
                err: err,
            })
        }
    }

    @Get(':id')
    findFilesByUserId(@Param('id') id: string) {
        return this.filesService.findFilesByUserId(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFileDto) {
        return this.filesService.update(+id, updateFileDto)
    }

    @Delete()
    async remove(@Body() fileData: DeleteFileDTO) {
        return await this.filesService.removeFile(fileData)
    }
}
