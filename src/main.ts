import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerConfig } from './swaggerConfig'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()

    //Swagger документация
    SwaggerConfig.setup(app)

    await app.listen(3001)
}

bootstrap()
