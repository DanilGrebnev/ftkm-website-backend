import {
    Injectable,
    NotFoundException,
    NotAcceptableException,
    OnModuleInit,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { UserDTO } from './user.dto'
import { userResponse } from './user.response'
import { returnTokenFromHeaders } from 'src/utils/returnTokenFromHeaders'
import { generateAccessToken } from '../../utils/genereteAccessToken'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { configuration } from 'src/configuration'
import { usersModuleInit } from './users.moduleInit'

@Injectable()
export class UserService implements OnModuleInit {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async onModuleInit() {
        await usersModuleInit(this.userModel)
    }

    async login(userDto: UserDTO): Promise<string | void> {
        const filter = { login: userDto?.login }

        try {
            //Ищем пользователя по логину
            const user = await this.userModel.findOne(filter).exec()

            //Если пользователь не найден - кидаем ошибку
            if (!user) throw new NotFoundException(userResponse.not_found)

            //Если пароль не сходится с паролем в бд - выдаём ошиьбку
            if (userDto.password !== user.password) {
                throw new NotAcceptableException(userResponse.not_access)
            }

            //Создаём токен и возвращаем на клиент
            const token = await generateAccessToken(userDto)

            return token
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async isAuth(req: Request): Promise<{ access: boolean } | void> {
        try {
            const jwt = new JwtService()

            const token = returnTokenFromHeaders(req)

            const options = { secret: configuration.secret_jwt }

            await jwt.verify(token, options)

            return { access: true }
        } catch (err) {
            console.log(userResponse.werification_error)

            console.log(err)

            throw new NotAcceptableException(userResponse.not_access)
        }
    }
}
