import { BaseService } from '../common/common.service'
import { ConnectionTypesEnum } from '../eligibility/eligibility.types'
import { EligibilityMinimalConsumptionEntity } from './eligibility-minimal-consumption.entity'
import { EligibilityMinimalConsumptionRepository } from './eligibility-minimal-consumption.repository'

export class EligibilityMinimalConsumptionService extends BaseService<EligibilityMinimalConsumptionEntity> {
  private eligibilityMinimalConsumptionRepository: EligibilityMinimalConsumptionRepository
  constructor() {
    const repositoryInstance = new EligibilityMinimalConsumptionRepository()
    super(repositoryInstance)
    this.eligibilityMinimalConsumptionRepository = repositoryInstance
  }

  public mockEligibilityMinimalConsumption() {
    this.repository.saveMany([
      new EligibilityMinimalConsumptionEntity(
        400,
        ConnectionTypesEnum.SINGLE_PHASE,
        1,
      ),
      new EligibilityMinimalConsumptionEntity(
        500,
        ConnectionTypesEnum.BI_PHASE,
        2,
      ),
      new EligibilityMinimalConsumptionEntity(
        750,
        ConnectionTypesEnum.THREE_PHASE,
        3,
      ),
    ])
    return this
  }

  public getByConnectionType(
    connectionType: ConnectionTypesEnum,
  ): EligibilityMinimalConsumptionEntity | undefined {
    return this.eligibilityMinimalConsumptionRepository.findByConnectionType(
      connectionType,
    )
  }
}
