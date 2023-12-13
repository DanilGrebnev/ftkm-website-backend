import * as fs from 'fs'
import * as path from 'path'

export const checklFile = async (pathToFile: string): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
        fs.access(path.resolve(__dirname, pathToFile), (err) => {
            if (err) {
                console.error('Ошибка', err)
                return resolve(false)
            }

            resolve(true)
        })
    })
}
