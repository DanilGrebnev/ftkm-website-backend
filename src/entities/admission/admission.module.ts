import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AdmissionSchema } from './schema/admission.schema'
import { AdmissionService } from './admission.service'
import { AdmissionController } from './admission.controller'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Admission', schema: AdmissionSchema },
        ]),
    ],
    providers: [AdmissionService],
    controllers: [AdmissionController],
})
export class AdmissionModule {}
