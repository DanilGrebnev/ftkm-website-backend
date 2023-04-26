import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { NewsModule } from './entities/news/news.module'
import { GetDocumentCountMiddleware } from './entities/news/middleware/CountDocumentsMiddleware'

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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(GetDocumentCountMiddleware).forRoutes('news')
    }
}