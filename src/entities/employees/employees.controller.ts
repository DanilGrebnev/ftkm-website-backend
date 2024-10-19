import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common'
import { Response } from 'express'
import { EmployeesService } from './employees.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { EmployeesDTO } from './employees.dto'
import { ErrorResponseDTO } from '../../shared/responses/ErrorResponses'
import { SuccessResponseDTO } from '../../shared/responses/SuccessResponses'

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) {}

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get all employees',
        type: [EmployeesDTO],
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error get employees',
        type: ErrorResponseDTO,
    })
    async findAllEmployee(@Res() res: Response) {
        try {
            const employees = await this.employeesService.findAllEmployees()
            return res.status(HttpStatus.OK).json(employees)
        } catch (err) {}
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success employee created',
        type: SuccessResponseDTO,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error employee create',
        type: ErrorResponseDTO,
    })
    async createEmployee(@Body() data: EmployeesDTO, @Res() res: Response) {
        try {
            await this.employeesService.createEmployees(data)
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Сотрудник создан' })
        } catch (err) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'Ошибка создания сотрудника' })
        }
    }

    @Put(':employeeId')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success employee changed',
        type: SuccessResponseDTO,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error employee changed',
        type: ErrorResponseDTO,
    })
    async changeEmployeeInfo(
        @Body() data: EmployeesDTO,
        @Param('employeeId') employeeId: string,
        @Res() res: Response,
    ) {
        try {
            await this.employeesService.changeEmployeesInfo({
                employeeId,
                data,
            })
            return res
                .status(HttpStatus.OK)
                .json({ message: 'Информация о сотруднике изменена' })
        } catch (err) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'Ошибка изменения информации о сотруднике' })
        }
    }

    @Delete(':employeeId')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success employee delete',
        type: SuccessResponseDTO,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error employee delete',
        type: ErrorResponseDTO,
    })
    async deleteEmployee(
        @Param('employeeId') employeeId: string,
        @Res() res: Response,
    ) {
        try {
            await this.employeesService.deleteEmployees(employeeId)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'Сотрудник удалён' })
        } catch (err) {
            console.log(err)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ message: 'Ошибка удаления сотрудника' })
        }
    }
}
