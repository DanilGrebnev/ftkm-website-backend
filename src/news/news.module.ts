import { Module } from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'
import { NewsSchema } from './schemas/ftkm.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }])],
    providers: [NewsService],
    controllers: [NewsController],
})
export class NewsModule {}
