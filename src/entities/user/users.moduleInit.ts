import { Model } from 'mongoose'
import { User } from './schemas/user.schema'

export const usersModuleInit = async (userModel: Model<User>) => {
    try {
        console.log('Проверка существования пользователя...')
        const users = await userModel.find()

        if (users.length) {
            console.log('Пользователь найден')
            return
        }

        console.log('Пользователь не найден. Создание пользователя...')
        const login = process.env.USER_LOGIN

        const password = process.env.USER_PASSWORD
        const newUser = new userModel({ login, password })
        await newUser.save()
        console.log('Пользователь успешно создан')
    } catch (err) {
        console.log('Ошибка создания пользователя', err)
    }
}
