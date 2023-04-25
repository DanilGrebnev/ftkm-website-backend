import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'
/**
 * Date transfer object - объект, который нужен для того,
 * чтобы знать, какой body придёт с запросом
 */
export class NewsDTO {
    @ApiProperty({
        required: true,
    })
    readonly title: string

    @ApiProperty({
        required: true,
    })
    readonly description: string

    @ApiProperty({
        required: true,
    })
    readonly body: string

    @ApiProperty({
        required: false,
    })
    readonly createdDay: number

    @ApiProperty({
        required: false,
    })
    readonly createdMonth: number

    @ApiProperty({
        required: false,
    })
    readonly createdYear: number

    readonly imgUrl?: string
}
