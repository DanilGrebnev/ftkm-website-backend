import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Employees } from './schema/employees.schema'
import { EmployeesDTO } from './employees.dto'

@Injectable()
export class EmployeesService {
    constructor(
        @InjectModel(Employees.name) private employeesModel: Model<Employees>,
    ) {}

    async findAllEmployees(): Promise<EmployeesDTO[]> {
        return this.employeesModel.find()
    }

    async createEmployees(data: EmployeesDTO) {
        const createEmployees = new this.employeesModel(data)
        return createEmployees.save()
    }

    async changeEmployeesInfo({
        data,
        employeeId,
    }: {
        employeeId: string
        data: EmployeesDTO
    }) {
        return this.employeesModel.findByIdAndUpdate(employeeId, data)
    }

    async deleteEmployees(employeeId: string) {
        const employees = await this.employeesModel.findByIdAndDelete(
            employeeId,
        )

        if (!employees) {
            throw new HttpException(
                'Ошибка удаления сотрудника: сотрудник не найден',
                HttpStatus.NOT_FOUND,
            )
        }

        return employees
    }
}
