import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NewsDocument = News & Document

@Schema()
export class News {
    @Prop({ required: true })
    title: string

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

    @Prop()
    createdDate?: string
}

export const NewsSchema = SchemaFactory.createForClass(News)

NewsSchema.pre('save', function (next) {
    const now = new Date()

    this.createdDay = now.getUTCDate()

    this.createdMonth = now.getUTCMonth() + 1

    this.createdYear = now.getUTCFullYear()

    this.createdDate = `${addZeroBeforeDate(
        this.createdDay,
    )}.${addZeroBeforeDate(this.createdMonth)}.${this.createdYear}`

    next()
})

function addZeroBeforeDate(date: number) {
    return date < 10 ? '0' + date : date
}
