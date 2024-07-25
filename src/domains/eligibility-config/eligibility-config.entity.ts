import { BaseEntity } from '../common/base.entity'
import {
  ConsumeClassesEnum,
  TaxModalityEnum,
} from '../eligibility/eligibility.types'

export class EligibilityConfigEntity extends BaseEntity {
  eligibleConsumptionClasses: ConsumeClassesEnum[]
  eligibleTaxModality: TaxModalityEnum[]

  constructor(
    eligibleConsumptionClasses: ConsumeClassesEnum[],
    eligibleTaxModality: TaxModalityEnum[],
  ) {
    super()
    this.eligibleConsumptionClasses = eligibleConsumptionClasses
    this.eligibleTaxModality = eligibleTaxModality
  }
}
