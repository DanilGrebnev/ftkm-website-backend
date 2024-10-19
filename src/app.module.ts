//@ts-nocheck
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
import 'dotenv/config'
import { AdmissionModule } from './entities/admission/admission.module'
import { EmployeeModule } from './entities/employees/employees.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, 'static'),
        }),
        MongooseModule.forRootAsync({
            useFactory: () => {
                const uri = process.env.MONGO_URI
                console.log('db uri:', uri)
                return { uri }
            },
        }),
        NewsModule,
        UserModule,
        FilesModule,
        AdmissionModule,
        EmployeeModule,
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
