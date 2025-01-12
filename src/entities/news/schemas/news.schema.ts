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

    const createdDay = addZeroBeforeDate(now.getDate())

    const createdMonth = addZeroBeforeDate(now.getMonth() + 1)

    const createdYear = now.getFullYear()

    const date = `${createdYear}-${createdMonth}-${createdDay}`

    this.createdDate = new Date(date).getTime()

    next()
})
