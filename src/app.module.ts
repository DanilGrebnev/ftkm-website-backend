import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NewsModule } from './entities/news/news.module'
import { GetDocumentCountMiddleware } from './entities/news/middleware/CountDocumentsMiddleware'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './entities/user/user.module'
import * as path from 'path'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, 'static'),
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1/' + 'ftkm', {
            useNewUrlParser: true,
        }),
        ConfigModule.forRoot(),
        NewsModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(GetDocumentCountMiddleware).forRoutes('news')
    }
}
