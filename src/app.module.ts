import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NewsModule } from './entities/news/news.module'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { UserModule } from './entities/user/user.module'
import * as path from 'path'
import { ApiTokenCheckMiddleware } from './middleware/ApiTokenCheckMiddleware'
import { NewsController } from './entities/news/news.controller'
import { FilesController } from './entities/files/files.controller'
import { FilesModule } from './entities/files/files.module'

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
        FilesModule,
    ],

    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    //Установка промежуточного обработчика
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ApiTokenCheckMiddleware)
            .exclude(
                {
                    path: 'news',
                    method: RequestMethod.GET,
                },
                {
                    path: 'news/:newsID',
                    method: RequestMethod.GET,
                },
            )
            // Указание контроллеов, которые должны проходит через middleware
            .forRoutes(NewsController, FilesController)
    }
}
