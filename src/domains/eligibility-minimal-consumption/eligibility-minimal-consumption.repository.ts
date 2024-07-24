import { ConnectionTypesEnum } from '../eligibility/eligibility.types'
import { EligibilityMinimalConsumptionEntity } from './eligibility-minimal-consumption.entity'

export class EligibilityMinimalConsumptionRepository {
  private eligibilityMinimalConsumption: EligibilityMinimalConsumptionEntity[] =
    []

  public buildEligibilityMinimalConsumption() {
    this.eligibilityMinimalConsumption.push(
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
    )
    return this
  }

  public getByConnectionType(
    connectionType: ConnectionTypesEnum,
  ): EligibilityMinimalConsumptionEntity | undefined {
    return this.eligibilityMinimalConsumption.find(
      (entity) => entity.connectionType === connectionType,
    )
  }
  public getAll(): EligibilityMinimalConsumptionEntity[] {
    return this.eligibilityMinimalConsumption
  }
}
