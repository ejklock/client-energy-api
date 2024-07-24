import { EligibilityMinimalConsumptionRepository } from '../eligibility-minimal-consumption/eligibility-minimal-consumption.repository'
import { EligibilityConfigEntity } from './eligibility-config.entity'
import { EligibilityConfigRepository } from './eligibility-config.repository'
import {
  ClientEligibilityData,
  ConnectionTypesEnum,
  EligibilityResponse,
} from './eligibility.types'

const CO2_EMISSION_PER_1000_KWH = 84

export class EligibilityService {
  private readonly eligibilityConfigRepository: EligibilityConfigRepository
  private readonly eligibilityMinimalConsumptionRepository: EligibilityMinimalConsumptionRepository

  constructor() {
    this.eligibilityConfigRepository =
      new EligibilityConfigRepository().buildEligibilityConfig()
    this.eligibilityMinimalConsumptionRepository =
      new EligibilityMinimalConsumptionRepository().buildEligibilityMinimalConsumption()
  }

  private calculateAverageConsumption(monthsConsumption: number[]): number {
    if (monthsConsumption.length === 0) return 0
    const total = monthsConsumption.reduce((prev, curr) => prev + curr, 0)
    return total / monthsConsumption.length
  }

  private getClientMinimalConsumption(
    connectionType: ConnectionTypesEnum,
  ): number | undefined {
    return this.eligibilityMinimalConsumptionRepository.getByConnectionType(
      connectionType,
    )?.minimalConsumption
  }

  private calculateCo2YearSaving(averageConsumption: number): number {
    const annualConsumption = averageConsumption * 12
    return (annualConsumption / 1000) * CO2_EMISSION_PER_1000_KWH
  }

  private validateConsumptionHistory(
    consumptionMonthHistory: number[],
    eligibilityResponse: EligibilityResponse,
  ): void {
    if (
      consumptionMonthHistory.length < 3 ||
      consumptionMonthHistory.length > 12
    ) {
      eligibilityResponse.eligible = false
      eligibilityResponse.reasonsOfIneligibility.push(
        'Client has not valid month consumption history',
      )
    }
  }

  private validateTaxModality(
    eligibilityConfig: EligibilityConfigEntity,
    taxModality: number,
    eligibilityResponse: EligibilityResponse,
  ): void {
    if (!eligibilityConfig.eligibleTaxModality.includes(taxModality)) {
      eligibilityResponse.eligible = false
      eligibilityResponse.reasonsOfIneligibility.push(
        'Client has not valid tax modality',
      )
    }
  }

  private validateConsumptionClass(
    eligibilityConfig: EligibilityConfigEntity,
    consumptionClass: number,
    eligibilityResponse: EligibilityResponse,
  ): void {
    if (
      !eligibilityConfig.eligibleConsumptionClasses.includes(consumptionClass)
    ) {
      eligibilityResponse.eligible = false
      eligibilityResponse.reasonsOfIneligibility.push(
        'Client has not valid consumption class',
      )
    }
  }

  private validateMinimalConsumption(
    averageConsumption: number,
    connectionType: ConnectionTypesEnum,
    eligibilityResponse: EligibilityResponse,
  ): void {
    const clientMinimalConsumption =
      this.getClientMinimalConsumption(connectionType)
    if (
      clientMinimalConsumption === undefined ||
      averageConsumption <= 0 ||
      averageConsumption < clientMinimalConsumption
    ) {
      eligibilityResponse.eligible = false
      eligibilityResponse.reasonsOfIneligibility.push(
        'Client has not valid minimal consumption',
      )
    }
  }

  public async checkClientEligibility({
    documentNumber,
    connectionType,
    taxModality,
    consumeClass,
    consumptionMonthHistory,
  }: ClientEligibilityData): Promise<EligibilityResponse> {
    const eligibilityResponse: EligibilityResponse = {
      eligible: true,
      reasonsOfIneligibility: [],
    }

    const averageConsumption = this.calculateAverageConsumption(
      consumptionMonthHistory,
    )
    const eligibilityConfig = this.eligibilityConfigRepository.firstOrFail()

    this.validateMinimalConsumption(
      averageConsumption,
      connectionType,
      eligibilityResponse,
    )
    this.validateConsumptionHistory(
      consumptionMonthHistory,
      eligibilityResponse,
    )
    this.validateConsumptionClass(
      eligibilityConfig,
      consumeClass,
      eligibilityResponse,
    )
    this.validateTaxModality(
      eligibilityConfig,
      taxModality,
      eligibilityResponse,
    )

    if (eligibilityResponse.reasonsOfIneligibility.length > 0) {
      return eligibilityResponse
    }

    const co2AnnualEconomy = this.calculateCo2YearSaving(averageConsumption)
    return {
      eligible: true,
      co2AnnualEconomy,
    }
  }
}
