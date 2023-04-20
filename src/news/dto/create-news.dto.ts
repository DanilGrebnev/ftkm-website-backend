import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class CreateNewsDTO {
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
