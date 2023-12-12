import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class DeleteFileDTO {
    @ApiProperty()
    readonly newsId: string

    @ApiProperty()
    readonly fileName: string
}
