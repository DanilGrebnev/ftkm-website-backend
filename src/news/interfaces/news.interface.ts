import { Document } from 'mongoose'

export interface INews extends Readonly<Document> {
    title: string
    description: string
    body: string
    author: string
}
