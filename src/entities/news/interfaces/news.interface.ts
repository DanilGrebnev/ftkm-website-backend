import { Document } from 'mongoose'

/**
 * Интерфейс нужен для типизации
 * возвращаемого значения из методов сервисов
 */
export interface INews extends Readonly<Document> {
    title: string
    description: string
    body: string
    author: string
    imgUrl: string
}
