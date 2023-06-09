import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { UserDTO } from './user.dto'
import { userResponse } from './user.response'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async checkUser(userDto: UserDTO) {
        const filter = { login: userDto?.login }

        try {
            const res = await this.userModel.findOne(filter).exec()

            if (!res) throw new Error(userResponse.not_found)

            return res
        } catch (err) {
            throw new NotFoundException(err.message)
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
