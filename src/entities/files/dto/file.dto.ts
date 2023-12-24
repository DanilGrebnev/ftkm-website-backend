import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class FileDTO {
    @ApiProperty()
    readonly newsId: string

    @ApiProperty()
    readonly name: string

    @ApiProperty()
    readonly data: string

    @ApiProperty()
    readonly extension: string
}
