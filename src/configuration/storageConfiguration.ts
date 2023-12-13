import { diskStorage } from 'multer'
import { createFileName } from 'src/utils/createDateFileName'
import * as path from 'path'

export const pathToUploads = '../../uploads/'

export const storageConfiguration = {
    storage: diskStorage({
        destination: path.resolve(__dirname, pathToUploads),
        filename: (req, file, cb) => {
            const fileName = createFileName(file)

            cb(null, fileName)
        },
    }),
}
