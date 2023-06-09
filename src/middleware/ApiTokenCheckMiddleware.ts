import { configuration } from 'src/configuration'
import {
    Injectable,
    NestMiddleware,
    NotAcceptableException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { userResponse } from '../entities/user/user.response'
import { JwtService } from '@nestjs/jwt'

// Промежуточный обработчик для
@Injectable()
export class ApiTokenCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const jwt = new JwtService()

        const token = req?.headers?.authorization?.split(' ')[1]

        console.log(`
        =================================
        Сработал промежуточный обработчик
        =================================
        `)

        if (!token) {
            throw new NotAcceptableException(userResponse.not_access)
        }

        const decodedData = jwt.verify(token, {
            secret: configuration.secret_jwt,
        })

        // console.log(decodedData)

        next()
    }
}
