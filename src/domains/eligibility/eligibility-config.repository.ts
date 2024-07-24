import { EligibilityConfigEntity } from './eligibility-config.entity'
import { ConsumeClassesEnum, TaxModalityEnum } from './eligibility.types'

export class EligibilityConfigRepository {
  private eligibilityConfigs: EligibilityConfigEntity[] = []

  public buildEligibilityConfig() {
    this.eligibilityConfigs.push({
      id: 1,
      eligibleConsumptionClasses: [
        ConsumeClassesEnum.INDUSTRY,
        ConsumeClassesEnum.COMERCIAL,
        ConsumeClassesEnum.RESIDENTIAL,
      ],
      eligibleTaxModality: [
        TaxModalityEnum.WHITE,
        TaxModalityEnum.CONVENTIONAL,
      ],
    })
    return this
  }

  public firstOrFail(): EligibilityConfigEntity {
    if (this.eligibilityConfigs.length === 0) {
      throw new Error('Eligibility config not found')
    }
    return this.eligibilityConfigs[0]
  }
}
