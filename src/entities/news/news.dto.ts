import {
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-property.decorator'
import { FileDTO } from '../files/dto/file.dto'
import { ApiHideProperty } from '@nestjs/swagger'

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

    @ApiPropertyOptional({ type: [FileDTO], default: [] })
    readonly files: FileDTO[] | []
}

/* Body for create news */
export class CreateNewsDTO {
    @ApiProperty()
    readonly title: string
    @ApiProperty()
    readonly body: string
    @ApiPropertyOptional()
    video: string
}

/* Body for update news */
export class UpdateNewsDTO extends CreateNewsDTO {}

export class ResponseNewsDTO extends NewsDTO {
    @ApiPropertyOptional()
    _id: string
    @ApiPropertyOptional()
    updatedAt: string
    @ApiPropertyOptional()
    createdAt: string
}