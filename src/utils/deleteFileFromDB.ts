import { NewsDocument } from 'src/entities/news/schemas/news.schema'

interface IDeleteFileFromDB {
    document: NewsDocument
    fileName: string
}

export const deleteFileFromDB = async ({
    document,
    fileName,
}: IDeleteFileFromDB) => {
    const updatedFiles = [...document.files].filter(
        (file) => file.name !== fileName,
    )

    document.files = updatedFiles

    const updatedDocument = await document.save()

    return updatedDocument
}
