import { Request } from 'express'

export const returnTokenFromHeaders = (req: Request) => {
    return req?.headers?.authorization?.split(' ')[1]
}
