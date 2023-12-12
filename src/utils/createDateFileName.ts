import { addZeroBeforeDate } from './addZeroBeforeDate'
import * as path from 'path'

export const createFileName = (file: Express.Multer.File): string => {
    const date = new Date()
    const fileName = path.parse(file.originalname).name.replace(/\s/g, '')

    const uploadDate =
        addZeroBeforeDate(date.getUTCDate()) +
        '.' +
        addZeroBeforeDate(date.getUTCMonth() + 1) +
        '.' +
        addZeroBeforeDate(date.getUTCFullYear()) +
        '_' +
        addZeroBeforeDate(date.getHours()) +
        '-' +
        addZeroBeforeDate(date.getMinutes()) +
        '-' +
        addZeroBeforeDate(date.getSeconds())

    const extension = path.parse(file.originalname).ext

    const resultName = fileName + '_' + uploadDate + extension

    return resultName
}
