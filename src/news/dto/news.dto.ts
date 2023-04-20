import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'
/**
 * Date transfer object - объект, который нужен для того,
 * чтобы знать, какой body придёт с запросом
 */
export class NewsDTO {
    @ApiProperty()
    readonly title: string
    @ApiProperty()
    readonly description: string
    @ApiProperty()
    readonly body: string
    @ApiProperty()
    readonly author: string
    @ApiProperty({
        required: false,
    })
    readonly imgUrl?: string
}
