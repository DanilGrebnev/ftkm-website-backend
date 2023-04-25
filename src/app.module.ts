import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { NewsModule } from './entities/news/news.module'

//!Не настроил middleware 
// import { CountDocumentsMiddleware } from './entities/news/middleware/CountDocumentsMiddleware'
// import { NewsController } from './entities/news/news.controller'
// import { NewsSchema } from './entities/news/schemas/news.schema'
// import { model } from 'mongoose'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1/ftkm', {
            useNewUrlParser: true,
        }),
        NewsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
