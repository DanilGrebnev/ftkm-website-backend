import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class ErrorResponseDTO<T extends Record<string, string>> {
    @ApiProperty()
    message: string
}
