import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator'

export class AdmissionDTO {
    @ApiProperty()
    amountOfBudgetPlaces: string

    @ApiProperty()
    passingScore: string
}
