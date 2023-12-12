import * as path from 'path'
import * as fs from 'fs'

type TDeleteFileReturnData = {
    delete: boolean
    error: any
}

export const deleteFile = async (
    pathToFile: string,
): Promise<TDeleteFileReturnData> => {
    return await new Promise((resolve, reject) => {
        fs.unlink(path.resolve(__dirname, pathToFile), (err) => {
            if (err) {
                reject({
                    delete: false,
                    error: err,
                })
            } else {
                resolve({
                    delete: true,
                    error: null,
                })
            }
        })
    })
}
