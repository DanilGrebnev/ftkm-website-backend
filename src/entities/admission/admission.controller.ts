import { Controller, Get, Res, HttpStatus, Put, Body } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { AdmissionService } from './admission.service'
import { AdmissionDTO } from './admission.dto'
import { Response } from 'express'

@ApiTags('admission')
@Controller('admission')
export class AdmissionController {
    constructor(private AdmissionService: AdmissionService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'return admission info',
        type: AdmissionDTO,
    })
    async getAdmission(@Res() res: Response) {
        try {
            const admission = await this.AdmissionService.getAdmissionInfo()
            return res.status(HttpStatus.OK).json(admission)
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json({
                amountOfBudgetPlaces: '40',
                passingScore: '118',
            } as AdmissionDTO)
        }
    }

    @Put()
    @ApiResponse({
        status: 200,
        description: 'change admission info',
        type: AdmissionDTO,
    })
    async changeAdmissionData(
        @Res() res: Response,
        @Body() body: AdmissionDTO,
    ) {
        try {
            const admission = await this.AdmissionService.changeAdmissionInfo(
                body,
            )

            return res.status(HttpStatus.OK).json(admission)
        } catch (err) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'Ошибка изменения информации о поступлении' })
        }
    }
}
