interface IErrorInfo {
    isValid: boolean
    errors: [] | TErrorInfoErrors[]
    statusCode: 400 | 200
    path: string
    [key: string]: any
}

interface TErrorInfoErrors {
    message: string
    field: string
}

/**
 * Метод isValidRequiredFields проверяет, не являются ли обязательные поля пустыми
 *Первый параметр принимает тело запроса c полями
 *Второй параметр принимает массив ключей, которые
 *являются опциональными
 */

interface isValidRequiredFieldsParams<T> {
    body: T
    notRequiredArrayFields: string[]
    path: string
}

export class Validate {
    static isValidRequiredFields<T extends object>({
        body,
        notRequiredArrayFields = [''],
        path,
    }: isValidRequiredFieldsParams<T>): IErrorInfo {
        const a = [...Object.entries(body)]

        let isValid: boolean = true
        let errors: TErrorInfoErrors[] = []

        a.forEach(([k, v]) => {
            if (!notRequiredArrayFields.includes(k) && !v) {
                errors.push({
                    message: `Поле ${k} не может быть пустым`,
                    field: k,
                })
            }
        })

        const errorInfo: IErrorInfo = {
            isValid,
            statusCode: 200,
            errors,
            path,
        }

        if (errors.length) {
            return {
                ...errorInfo,
                isValid: false,
                statusCode: 400,
            }
        }

        return errorInfo
    }
}
