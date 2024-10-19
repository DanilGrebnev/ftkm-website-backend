import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class SuccessResponseDTO {
    @ApiProperty()
    message: string
}
