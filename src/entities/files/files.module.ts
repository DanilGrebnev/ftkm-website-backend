import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesController } from './files.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { NewsSchema } from '../news/schemas/news.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
    ],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}
