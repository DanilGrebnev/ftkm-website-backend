import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerConfig } from './swaggerConfig'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

const PORT = process.env.PORT || 8089

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })

    const options: CorsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        exposedHeaders: ['X-Total-Count'],
    }

    app.enableCors(options)

    //Swagger документация
    SwaggerConfig.setup(app)

    await app.listen(PORT, () => {
        console.log('Server started on port ' + PORT)
    })
}

bootstrap()
