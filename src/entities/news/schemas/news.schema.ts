import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { addZeroBeforeDate } from 'src/utils/addZeroBeforeDate'

export type NewsDocument = News & Document

@Schema()
export class News {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    body: string

    @Prop({ required: false })
    createdDay?: number

    @Prop({ required: false })
    createdYear?: number

    @Prop()
    createdMonth?: number

    @Prop()
    createdDate?: string

    @Prop({ required: false })
    imgName?: string
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
