import { EligibilityConfigEntity } from '../eligibility-config/eligibility-config.entity'

import {
  ClientEligibilityData,
  ConnectionTypesEnum,
  EligibilityResponse,
} from './eligibility.types'
import {
  calculateAverageConsumption,
  calculateCo2YearSaving,
  isValidDocumentCpfCnpj,
} from '../../utils/common'
import { EligibilityConfigService } from '../eligibility-config/eligibility-config.service'
import { EligibilityMinimalConsumptionService } from '../eligibility-minimal-consumption/eligibility-minimal-consumption.service'

export class EligibilityService {
  private readonly eligibilityConfigService: EligibilityConfigService
  private readonly eligibilityMinimalConsumptionService: EligibilityMinimalConsumptionService

  constructor() {
    this.eligibilityConfigService =
      new EligibilityConfigService().mockEligibilityConfig()
    this.eligibilityMinimalConsumptionService =
      new EligibilityMinimalConsumptionService().mockEligibilityMinimalConsumption()
  }

  private getClientMinimalConsumption(
    connectionType: ConnectionTypesEnum,
  ): number | undefined {
    return this.eligibilityMinimalConsumptionService.getByConnectionType(
      connectionType,
    )?.minimalConsumption
  }

  private validateConsumptionHistory(
    consumptionMonthHistory: number[],
    validationErrors: string[],
  ): void {
    if (
      consumptionMonthHistory.length < 3 ||
      consumptionMonthHistory.length > 12
    ) {
      validationErrors.push('Client has not valid month consumption history')
    }
  }

  private validateTaxModality(
    eligibilityConfig: EligibilityConfigEntity,
    taxModality: number,
    validationErrors: string[],
  ): void {
    if (!eligibilityConfig.eligibleTaxModality.includes(taxModality)) {
      validationErrors.push('Client has not valid tax modality')
    }
  }

  private validateConsumptionClass(
    eligibilityConfig: EligibilityConfigEntity,
    consumptionClass: number,
    validationErrors: string[],
  ): void {
    if (
      !eligibilityConfig.eligibleConsumptionClasses.includes(consumptionClass)
    ) {
      validationErrors.push('Client has not valid consumption class')
    }
  }

  private validateClientDocumentNumber(
    documentNumber: string,
    validationErrors: string[],
  ): void {
    const isValid = isValidDocumentCpfCnpj(documentNumber)

    if (!isValid) {
      validationErrors.push('Invalid cpf or cnpj')
    }
  }

  private validateMinimalConsumption(
    averageConsumption: number,
    connectionType: ConnectionTypesEnum,
    validationErrors: string[],
  ): void {
    const clientMinimalConsumption =
      this.getClientMinimalConsumption(connectionType)
    if (
      clientMinimalConsumption === undefined ||
      averageConsumption <= 0 ||
      averageConsumption < clientMinimalConsumption
    ) {
      validationErrors.push('Client has not valid minimal consumption')
    }
  }

  public checkClientEligibility({
    documentNumber,
    connectionType,
    taxModality,
    consumeClass,
    consumptionMonthHistory,
  }: ClientEligibilityData): EligibilityResponse {
    const validationErrors: string[] = []

    const eligibilityResponse: EligibilityResponse = {
      eligible: false,
    }

    const averageConsumption = calculateAverageConsumption(
      consumptionMonthHistory,
    )
    const eligibilityConfig =
      this.eligibilityConfigService.findEligibilityConfigOrFail()

    this.validateClientDocumentNumber(documentNumber, validationErrors)

    this.validateMinimalConsumption(
      averageConsumption,
      connectionType,
      validationErrors,
    )
    this.validateConsumptionHistory(consumptionMonthHistory, validationErrors)
    this.validateConsumptionClass(
      eligibilityConfig,
      consumeClass,
      validationErrors,
    )
    this.validateTaxModality(eligibilityConfig, taxModality, validationErrors)

    if (validationErrors.length > 0) {
      eligibilityResponse.eligible = false
      eligibilityResponse.reasonsOfIneligibility = validationErrors
      return eligibilityResponse
    }

    const co2AnnualEconomy = calculateCo2YearSaving(averageConsumption)
    return {
      eligible: true,
      co2AnnualEconomy,
    }
  }
}
