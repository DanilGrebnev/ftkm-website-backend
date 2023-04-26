import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerConfig } from './swaggerConfig'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })
    app.enableCors()

    const httpAdapter = app.getHttpAdapter()

    //Swagger документация
    SwaggerConfig.setup(app)

    await app.listen(3001)
}

bootstrap()
