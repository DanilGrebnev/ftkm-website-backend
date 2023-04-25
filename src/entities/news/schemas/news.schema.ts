import { Mongoose, Schema } from 'mongoose'

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

        createdDay: Number,
        createdMonth: Number,
        createdYear: Number,

        imgUrl: String,
    },

    {
        timestamps: true,
        versionKey: false,
    },
)

NewsSchema.pre('save', function (next) {
    const now = new Date()

    this.createdDay = now.getUTCDate()
    this.createdMonth = now.getUTCMonth() + 1
    this.createdYear = now.getUTCFullYear()

    next()
})
