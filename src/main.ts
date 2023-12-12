import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerConfig } from './swaggerConfig'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { configuration } from './configuration'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as path from 'path'

async function bootstrap() {
    const { db_port } = configuration

    const options: CorsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        exposedHeaders: ['x-total-count'],
    }

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    })

    app.enableCors(options)

    app.useStaticAssets(path.join(__dirname, '../uploads'))

    //Swagger документация
    SwaggerConfig.setup(app)

    await app.listen(8089, () => {
        console.log('Server started on port ' + db_port)
    })
}

bootstrap()
