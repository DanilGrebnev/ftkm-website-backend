import {Document} from 'mongoose'

interface NewsReadnOnly extends Document {
   title: string
   description:string
   body:string
   author:string
   date_posted:string
}

export interface INews extends Readonly<NewsReadnOnly>{

} 