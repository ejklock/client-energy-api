import { describe, expect, it } from 'vitest'
import { EligibilityService } from './eligibility.service'
import {
  ConnectionTypesEnum,
  ConsumeClassesEnum,
  TaxModalityEnum,
} from './eligibility.types'

describe('EligibilityService', () => {
  it('should client be eligible', () => {
    const eligibilityService = new EligibilityService()
    const response = eligibilityService.checkClientEligibility({
      documentNumber: '49859754000190',
      connectionType: ConnectionTypesEnum.BI_PHASE,
      consumeClass: ConsumeClassesEnum.COMERCIAL,
      taxModality: TaxModalityEnum.CONVENTIONAL,
      consumptionMonthHistory: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    })

    console.log(response)
    expect(response).toEqual({
      eligible: true,
      co2AnnualEconomy: 5553.24,
    })
  })

  it('should client be ineligible by invalid document', () => {
    const eligibilityService = new EligibilityService()
    const response = eligibilityService.checkClientEligibility({
      documentNumber: '14041737706',
      connectionType: ConnectionTypesEnum.BI_PHASE,
      consumeClass: ConsumeClassesEnum.COMERCIAL,
      taxModality: TaxModalityEnum.CONVENTIONAL,
      consumptionMonthHistory: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    })
    expect(response).toEqual({
      eligible: false,
      reasonsOfIneligibility: ['Invalid cpf or cnpj'],
    })
  })

  it('should client be ineligible by InvalidConsumeClass and InvalidTaxModality', () => {
    const eligibilityService = new EligibilityService()
    const response = eligibilityService.checkClientEligibility({
      documentNumber: '49859754000190',
      connectionType: ConnectionTypesEnum.BI_PHASE,
      consumeClass: ConsumeClassesEnum.RURAL,
      taxModality: TaxModalityEnum.GREEN,
      consumptionMonthHistory: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
      ],
    })
    expect(response).toEqual({
      eligible: false,
      reasonsOfIneligibility: [
        'Client has not valid consumption class',
        'Client has not valid tax modality',
      ],
    })
  })

  it('should client be ineligible by InvalidConsumeClass and InvalidTaxModality and Invalid Consumption History', () => {
    const eligibilityService = new EligibilityService()
    const response = eligibilityService.checkClientEligibility({
      documentNumber: '49859754000190',
      connectionType: ConnectionTypesEnum.BI_PHASE,
      consumeClass: ConsumeClassesEnum.RURAL,
      taxModality: TaxModalityEnum.GREEN,
      consumptionMonthHistory: [3878, 9760],
    })
    expect(response).toEqual({
      eligible: false,
      reasonsOfIneligibility: [
        'Client has not valid month consumption history',
        'Client has not valid consumption class',
        'Client has not valid tax modality',
      ],
    })
  })

  it('should client be ineligible by InvalidConsumeClass and InvalidTaxModality and Invalid Minimal Consumption', () => {
    const eligibilityService = new EligibilityService()
    const response = eligibilityService.checkClientEligibility({
      documentNumber: '49859754000190',
      connectionType: ConnectionTypesEnum.BI_PHASE,
      consumeClass: ConsumeClassesEnum.RURAL,
      taxModality: TaxModalityEnum.GREEN,
      consumptionMonthHistory: [1000, 10, 30, 50],
    })

    expect(response).toEqual({
      eligible: false,
      reasonsOfIneligibility: [
        'Client has not valid minimal consumption',
        'Client has not valid consumption class',
        'Client has not valid tax modality',
      ],
    })
  })
})
