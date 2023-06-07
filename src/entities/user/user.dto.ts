import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class UserDTO {
    @ApiProperty()
    readonly login: string

    @ApiProperty()
    readonly password: string
}
