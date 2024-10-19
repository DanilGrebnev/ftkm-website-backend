import {
    HttpException,
    HttpStatus,
    Injectable,
    OnModuleInit,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Admission } from './schema/admission.schema'
import { admissionModuleInit } from './admission.moduleInit'
import { AdmissionDTO } from './admission.dto'

@Injectable()
export class AdmissionService implements OnModuleInit {
    constructor(
        @InjectModel(Admission.name)
        private readonly admissionModel: Model<Admission>,
    ) {}

    async onModuleInit() {
        await admissionModuleInit(this.admissionModel)
    }

    async getAdmissionInfo(): Promise<Admission> {
        const admission = await this.admissionModel.find()
        return admission[0]
    }

    async changeAdmissionInfo(data: AdmissionDTO) {
        const admissionList = await this.admissionModel.find()
        const admissionData = admissionList[0]

        if (!admissionData) {
            throw new HttpException(
                'Ошибка редактирования информации о поступлении',
                HttpStatus.NOT_FOUND,
            )
        }
        admissionData.passingScore = data.passingScore
        admissionData.amountOfBudgetPlaces = data.amountOfBudgetPlaces

        return await admissionData.save()
    }
}
