import { ConnectionTypesEnum } from '../eligibility/eligibility.types'

export class EligibilityMinimalConsumptionEntity {
  id: number
  minimalConsumption: number
  connectionType: ConnectionTypesEnum

  constructor(
    minimalConsumption: number,
    connectionType: ConnectionTypesEnum,
    id?: number,
  ) {
    this.id = id
    this.minimalConsumption = minimalConsumption
    this.connectionType = connectionType
  }
}
