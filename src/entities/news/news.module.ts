import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { NewsSchema } from './schemas/news.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { FileService } from '../file/file.service'
import { ApiTokenCheckMiddleware } from 'src/middleware/ApiTokenCheckMiddleware'

@Module({
    //Регистрируем схему
    imports: [
        MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
    ],
    providers: [NewsService, FileService],
    controllers: [NewsController],
})
export class NewsModule {}
