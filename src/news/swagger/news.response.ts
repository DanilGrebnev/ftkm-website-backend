import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-property.decorator'
import { NewsDTO } from '../dto/news.dto'

export class editNews extends NewsDTO {
    @ApiProperty()
    _id: string
    @ApiProperty()
    updatedAt: string
    @ApiProperty()
    createdAt: string
}

export class getOneNews extends editNews {}
