import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { EmployeesService } from './employees.service'
import { Employees, EmployeesSchema } from './schema/employees.schema'
import { EmployeesController } from './employees.controller'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Employees.name, schema: EmployeesSchema },
        ]),
    ],
    controllers: [EmployeesController],
    providers: [EmployeesService],
})
export class EmployeeModule {}
