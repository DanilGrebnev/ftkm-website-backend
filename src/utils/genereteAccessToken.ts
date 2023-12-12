import { UserDTO } from 'src/entities/user/user.dto'
import { configuration } from 'src/configuration'
import { JwtService } from '@nestjs/jwt'

export const generateAccessToken = async (
    userDto: UserDTO,
): Promise<string> => {
    const jwt = new JwtService()

    const token = await jwt.signAsync(userDto, {
        expiresIn: '24h',
        secret: configuration.secret_jwt,
    })

    return token
}
