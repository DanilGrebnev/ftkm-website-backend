import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ versionKey: false })
export class Admission {
    @Prop({ required: true })
    // Количество бюджетных мест
    amountOfBudgetPlaces: string
    // Проходной балл
    @Prop({ required: true })
    passingScore: string
}

export const AdmissionSchema = SchemaFactory.createForClass(Admission)
