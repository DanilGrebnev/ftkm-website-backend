import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class EmployeesDTO {
    @ApiProperty({ required: false })
    _id: string
    @ApiProperty()
    name: string
    @ApiProperty()
    description: string
    @ApiProperty({ required: false })
    link: string
}
