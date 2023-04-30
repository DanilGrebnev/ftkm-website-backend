import { ApiPropertyOptional } from '@nestjs/swagger'

export class FileUploadDto {
    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    file: any
}
