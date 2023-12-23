import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerConfig } from './swaggerConfig'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as path from 'path'

const PORT = process.env.PORT

async function bootstrap() {
    const options: CorsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        exposedHeaders: ['x-total-count'],
    }

    console.log(`App use port: ${PORT} for start`)

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true,
    })

    app.enableCors(options)

    app.useStaticAssets(path.join(__dirname, '../uploads'))

    //Swagger документация
    SwaggerConfig.setup(app)

    await app.listen(PORT, () => {
        console.log('Server started on port ' + PORT)
    })
}

bootstrap()
