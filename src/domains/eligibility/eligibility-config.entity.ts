import { ConsumeClassesEnum, TaxModalityEnum } from './eligibility.types'

export class EligibilityConfigEntity {
  id: number
  eligibleConsumptionClasses: ConsumeClassesEnum[]
  eligibleTaxModality: TaxModalityEnum[]

  constructor(
    eligibleConsumptionClasses: ConsumeClassesEnum[],
    eligibleTaxModality: TaxModalityEnum[],
  ) {
    this.eligibleConsumptionClasses = eligibleConsumptionClasses
    this.eligibleTaxModality = eligibleTaxModality
  }
}
