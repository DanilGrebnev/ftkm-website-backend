import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class NewsDTO {
    @ApiProperty()
    readonly title: string

    @ApiProperty()
    readonly body: string

    @ApiPropertyOptional()
    video: string

    @ApiPropertyOptional()
    readonly createdDay?: number

    @ApiPropertyOptional()
    readonly createdMonth?: number

    @ApiPropertyOptional()
    readonly createdYear?: number

    @ApiPropertyOptional()
    readonly createdDate?: string

    @ApiPropertyOptional()
    readonly files?: {
        newsId: string
        href: string
        data: string
    }[]
}
