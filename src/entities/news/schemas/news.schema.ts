import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NewsDocument = News & Document

@Schema()
export class News {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true })
    body: string

    @Prop()
    imgUrl?: string

    @Prop()
    createdDay?: number

    @Prop()
    createdMonth?: number

    @Prop()
    createdYear?: number
}

export const NewsSchema = SchemaFactory.createForClass(News)

NewsSchema.pre('save', function (next) {
    const now = new Date()

    this.createdDay = now.getUTCDate()
    this.createdMonth = now.getUTCMonth() + 1
    this.createdYear = now.getUTCFullYear()

    next()
})
