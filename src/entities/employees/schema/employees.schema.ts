import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { EmployeesDTO } from '../employees.dto'

@Schema({ versionKey: false })
export class Employees implements Omit<EmployeesDTO, '_id'> {
    @Prop({ required: true })
    name: string
    @Prop({ required: true })
    description: string
    @Prop({ required: false, default: null })
    link: string
}

export const EmployeesSchema = SchemaFactory.createForClass(Employees)
