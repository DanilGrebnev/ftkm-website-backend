import { configuration } from 'src/configuration'
import {
    Injectable,
    NestMiddleware,
    NotAcceptableException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { userResponse } from '../entities/user/user.response'
import { JwtService } from '@nestjs/jwt'
import { returnTokenFromHeaders } from 'src/utils/returnTokenFromHeaders'
// Промежуточный обработчик для
@Injectable()
export class ApiTokenCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const jwt = new JwtService()

        const token = returnTokenFromHeaders(req)

        console.log(`
        ===============================================
        worked middleware ApiTokenCheck
        ===============================================
        `)

        if (!token) {
            throw new NotAcceptableException(userResponse.not_access)
        }

        try {
            jwt.verify(token, {
                secret: configuration.secret_jwt,
            })

            next()
        } catch (err) {
            throw new NotAcceptableException(userResponse.not_access)
        }
    }
}
