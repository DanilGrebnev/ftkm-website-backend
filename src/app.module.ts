import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { NewsModule } from './entities/news/news.module'
import { GetDocumentCountMiddleware } from './entities/news/middleware/CountDocumentsMiddleware'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { ConfigModule } from '@nestjs/config'

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1/'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, 'static'),
        }),
        MongooseModule.forRoot(DB_URL + 'ftkm', {
            useNewUrlParser: true,
        }),
        ConfigModule.forRoot(),
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
