import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { addZeroBeforeDate } from 'src/utils/addZeroBeforeDate'

export type NewsDocument = News & Document

@Schema({ versionKey: false })
export class News {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    body: string

    @Prop({ default: '' })
    video: string

    @Prop({ required: false })
    createdDay?: number

    @Prop({ required: false })
    createdYear?: number

    @Prop()
    createdMonth?: number

    @Prop({ required: false })
    createdDate?: number

    @Prop({ required: false, default: [] })
    files?: {
        newsId: string
        name: string
        data: string
        extension: string
    }[]
}

export const NewsSchema = SchemaFactory.createForClass(News)

NewsSchema.pre('save', function (next) {
    const now = new Date()
    
    this.createdDay = now.getDate()

    this.createdMonth = now.getMonth() + 1

    this.createdYear = now.getFullYear()

    const date = `${this.createdYear}-${addZeroBeforeDate(this.createdMonth)}-${addZeroBeforeDate(this.createdDay)}`

    this.createdDate = new Date(date).getTime()

    next()
})
