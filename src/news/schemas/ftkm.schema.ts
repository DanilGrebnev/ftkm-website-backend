import mongoose from 'mongoose'

export const NewsSchema = new mongoose.Schema({
   title: String,
   description:String,
   body: String,
   author: String,
   date_posted: String
}, {
   timestamps:true
})