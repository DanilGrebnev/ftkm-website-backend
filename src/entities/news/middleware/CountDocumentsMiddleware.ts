import { InjectModel } from '@nestjs/mongoose'
import { NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { NewsSchema } from '../schemas/news.schema'
import { Model } from 'mongoose'
import { INews } from '../interfaces/news.interface'

export class GetDocumentCountMiddleware implements NestMiddleware {
    constructor(
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {

        console.log('hello')
        next()
    }
}
