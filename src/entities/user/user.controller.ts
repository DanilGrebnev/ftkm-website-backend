import { Controller, Get, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDTO } from './user.dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiBody({ type: UserDTO })
    @Post('login')
    async login(@Body() userDto: UserDTO) {
        const res = await this.userService.login(userDto)

        return { token: res }
    }
}
