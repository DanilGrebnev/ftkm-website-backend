import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerConfig } from './swaggerConfig'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { configuration } from './configuration'

const { db_port } = configuration

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })

    const options: CorsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        exposedHeaders: ['x-total-count'],
    }

    app.enableCors(options)

    //Swagger документация
    SwaggerConfig.setup(app)

    await app.listen(db_port, () => {
        console.log('Server started on port ' + db_port)
    })
}

bootstrap()
