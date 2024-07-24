import { BaseEntity } from '../common/base.entity'
import { ConnectionTypesEnum } from '../eligibility/eligibility.types'

export class EligibilityMinimalConsumptionEntity extends BaseEntity<EligibilityMinimalConsumptionEntity> {
  minimalConsumption: number
  connectionType: ConnectionTypesEnum

  constructor(
    minimalConsumption: number,
    connectionType: ConnectionTypesEnum,
    id?: number,
  ) {
    super()
    this.id = id
    this.minimalConsumption = minimalConsumption
    this.connectionType = connectionType
  }
}
