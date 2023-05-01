import { ApiPropertyOptional } from '@nestjs/swagger'

export class FileImageDto {
    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    file: any
}
