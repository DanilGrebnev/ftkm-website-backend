import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-property.decorator'
import { NewsDTO } from '../news.dto'

export class NewsResponseDTO extends NewsDTO {
    @ApiPropertyOptional()
    _id: string
    @ApiPropertyOptional()
    updatedAt: string
    @ApiPropertyOptional()
    createdAt: string
}

export class GetOneNewsDTO extends NewsResponseDTO {}
