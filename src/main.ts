import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()

    //Swagger документация
    const config = new DocumentBuilder()
        .setTitle('FTKM backend')
        .setDescription('The FTKM backend description')
        .setVersion('1.0')
        .addTag('ftkm')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)

    await app.listen(3001)
}

bootstrap()
