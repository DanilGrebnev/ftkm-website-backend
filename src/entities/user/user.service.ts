import {
    Injectable,
    NotFoundException,
    HttpException,
    BadRequestException,
    NotAcceptableException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { UserDTO } from './user.dto'
import { userResponse } from './user.response'

import { generateAccessToken } from '../../utils/genereteAccessToken'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async login(userDto: UserDTO): Promise<any> {
        const filter = { login: userDto?.login }

        try {
            //Ищем пользователя по логину
            const user = await this.userModel.findOne(filter).exec()

            if (!user) throw new NotFoundException(userResponse.not_found)

            if (userDto.password !== user.password) {
                throw new NotAcceptableException(userResponse.not_access)
            }

            const token = await generateAccessToken(userDto)

            return token
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async createUser(userDto: UserDTO) {
        try {
            const newUser = new this.userModel(userDto)

            const res = await newUser.save()

            return res
        } catch (err) {
            console.log(err)
            return err
        }
    }
}
