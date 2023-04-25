//!Мидлвара не работает.
import { NewsSchema } from '../schemas/news.schema'
import { Request, Response, NextFunction } from 'express'
import { Model, Document } from 'mongoose'

type NewsDocument = typeof NewsSchema & Document

export const CountDocumentsMiddleware =
    (newsModel: Model<NewsDocument>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const count = await newsModel.countDocuments()
        res.setHeader('X-Collection-Size', count)
        next()
    }
