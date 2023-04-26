import { Module } from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { NewsSchema } from './schemas/news.schema'
import { MongooseModule } from '@nestjs/mongoose'
// import { CountDocumentsService } from './countDocuments.service'

@Module({
    //Регистрируем схему
    imports: [
        MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
    ],
    providers: [NewsService],
    controllers: [NewsController],
})
export class NewsModule {}
