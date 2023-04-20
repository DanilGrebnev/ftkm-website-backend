import { Schema } from 'mongoose'

export const NewsSchema = new Schema(
    {
        title: {
            required: true,
            type: String,
        },
        description: {
            required: true,
            type: String,
        },
        body: {
            required: true,
            type: String,
        },
        author: {
            required: true,
            type: String,
        },
        imgUrl: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
)
