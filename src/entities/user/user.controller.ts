import { Controller, Get, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDTO } from './user.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('check')
    @ApiBody({ type: UserDTO })
    async checkUser(@Body() userDto: UserDTO) {
        const res = await this.userService.checkUser(userDto)

        return { res }
    }

    @Post()
    addUser(@Body() userDto: UserDTO) {
        const res = this.userService.createUser(userDto)
        return res
    }
}
