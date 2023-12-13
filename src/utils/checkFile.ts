import * as fs from 'fs'
import * as path from 'path'

export const checklFile = (pathToFile: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.access(path.resolve(__dirname, pathToFile), (err) => {
            if (err) {
                console.error('Ошибка', err)
                return resolve(false)
            }

            resolve(true)
        })
    })
}
