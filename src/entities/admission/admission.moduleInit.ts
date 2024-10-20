import { Model } from 'mongoose'
import { Admission } from './schema/admission.schema'

// Инициализация
export const admissionModuleInit = async (admissionModel: Model<Admission>) => {
    console.log('Проверка существования информации о поступлении')
    const currentAdmission = await admissionModel.find()

    if (currentAdmission[0]) {
        console.log('Информация о поступлении найдена')
        return
    }
    console.log('Создание информации о поступлении')
    const newAdmission = new admissionModel({
        amountOfBudgetPlaces: '40',
        passingScore: '130',
    })

    await newAdmission.save()
    console.log('Информация о поступлении добавлена в базу данных')
}
