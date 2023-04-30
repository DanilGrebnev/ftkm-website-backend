import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-property.decorator'
/**
 * Date transfer object - объект, который нужен для того,
 * чтобы знать, какой body придёт с запросом
 */
export class NewsDTO {
    @ApiProperty()
    readonly title: string

    @ApiProperty()
    readonly body: string

    @ApiPropertyOptional()
    readonly createdDay: number

    @ApiPropertyOptional()
    readonly createdMonth: number

    @ApiPropertyOptional()
    readonly createdYear: number

    @ApiPropertyOptional()
    readonly createdDate: string

    @ApiPropertyOptional()
    readonly imgUrl?: string
}
