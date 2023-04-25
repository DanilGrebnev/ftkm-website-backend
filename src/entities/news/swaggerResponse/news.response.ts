import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-property.decorator'
import { NewsDTO } from '../dto/news.dto'

export class NewsResponse extends NewsDTO {
    @ApiProperty()
    _id: string
    @ApiProperty()
    updatedAt: string
    @ApiProperty()
    createdAt: string
}

export class GetOneNewsResponse extends NewsResponse {}
