import { BaseService } from '../common/common.service'
import {
  ConsumeClassesEnum,
  TaxModalityEnum,
} from '../eligibility/eligibility.types'
import { EligibilityConfigEntity } from './eligibility-config.entity'
import { EligibilityConfigRepository } from './eligibility-config.repository'

export class EligibilityConfigService extends BaseService<EligibilityConfigEntity> {
  protected readonly repository: EligibilityConfigRepository

  constructor() {
    const repositoryInstance = new EligibilityConfigRepository()
    super(repositoryInstance)
    this.repository = new EligibilityConfigRepository()
  }

  public mockEligibilityConfig() {
    const eligibilityConfig = new EligibilityConfigEntity(
      [
        ConsumeClassesEnum.INDUSTRY,
        ConsumeClassesEnum.COMERCIAL,
        ConsumeClassesEnum.RESIDENTIAL,
      ],
      [TaxModalityEnum.WHITE, TaxModalityEnum.CONVENTIONAL],
    )

    this.repository.saveMany([eligibilityConfig])

    return this
  }

  public findEligibilityConfigOrFail(): EligibilityConfigEntity {
    const eligibilityConfig = this.repository.firstOrFail()
    return eligibilityConfig
  }
}
