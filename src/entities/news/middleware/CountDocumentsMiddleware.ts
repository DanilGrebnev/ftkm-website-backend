import { InjectModel } from '@nestjs/mongoose'
import { NestMiddleware, Injectable } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class GetDocumentCountMiddleware implements NestMiddleware {
    constructor() // private readonly countDocumentsService: CountDocumentsService,
    {}

    async use(req: Request, res: Response, next: NextFunction) {
        // const count = await this.countDocumentsService.getCountDocuments()

        // console.log('hello')
        next()
    }
}
