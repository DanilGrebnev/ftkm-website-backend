import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NewsModule } from './entities/news/news.module'
import { GetDocumentCountMiddleware } from './entities/news/middleware/CountDocumentsMiddleware'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { UserModule } from './entities/user/user.module'
import * as path from 'path'
import { ApiTokenCheckMiddleware } from './middleware/ApiTokenCheckMiddleware'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, 'static'),
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1/' + 'ftkm', {
            useNewUrlParser: true,
        }),
        NewsModule,
        UserModule,
    ],

    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    //Установка промежуточного обработчика
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ApiTokenCheckMiddleware).forRoutes(
            {
                path: 'news',
                method: RequestMethod.POST,
            },
            {
                path: 'news',
                method: RequestMethod.PUT,
            },
            {
                path: 'news',
                method: RequestMethod.DELETE,
            },
        )
    }
}
