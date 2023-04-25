import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'

export class SwaggerConfig {
    static config = new DocumentBuilder()
        .setTitle('FTKM backend')
        .setDescription('The FTKM backend description')
        .setVersion('1.0')
        .build()

    static setup(app: any) {
        const document = SwaggerModule.createDocument(app, this.config)
        SwaggerModule.setup('swagger', app, document)
    }
}
