import { InMemoryRepository } from '../common/in-memory.repository'
import { ConnectionTypesEnum } from '../eligibility/eligibility.types'
import { EligibilityMinimalConsumptionEntity } from './eligibility-minimal-consumption.entity'

export class EligibilityMinimalConsumptionRepository extends InMemoryRepository<EligibilityMinimalConsumptionEntity> {
  public findByConnectionType(
    connectionType: ConnectionTypesEnum,
  ): EligibilityMinimalConsumptionEntity | undefined {
    return this.items.find((entity) => entity.connectionType === connectionType)
  }
}
