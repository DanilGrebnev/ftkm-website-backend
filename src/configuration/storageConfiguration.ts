import { diskStorage } from 'multer'
import { createFileName } from 'src/utils/createDateFileName'
import * as path from 'path'

export const storageConfiguration = {
    storage: diskStorage({
        destination: path.resolve(__dirname, '../../uploads'),
        filename: (req, file, cb) => {
            const fileName = createFileName(file)

            cb(null, fileName)
        },
    }),
}
