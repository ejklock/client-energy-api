export enum ConnectionTypesEnum {
  SINGLE_PHASE = 'SINGLE_PHASE',
  BI_PHASE = 'BI_PHASE',
  THREE_PHASE = 'THREE_PHASE',
}

export enum ConsumeClassesEnum {
  RESIDENTIAL = 'RESIDENTIAL',
  INDUSTRY = 'INDUSTRY',
  COMERCIAL = 'COMERCIAL',
  RURAL = 'RURAL',
  GOVERNMENT = 'GOVERNMENT',
}

export enum TaxModalityEnum {
  BLUE = 'BLUE',
  WHITE = 'WHITE',
  GREEN = 'GREEN',
  CONVENTIONAL = 'CONVENTIONAL',
}

export type ValidationErrors = {
  [key: string]: string
}

export type ClientEligibilityData = {
  documentNumber: string
  connectionType: ConnectionTypesEnum
  taxModality: TaxModalityEnum
  consumeClass: ConsumeClassesEnum
  consumptionMonthHistory: number[]
}

export type IneligibleResponse = {
  reasonsOfIneligibility: string[]
}

export type EligibleResponse = {
  co2AnnualEconomy: number
}

export type EligibilityResponse = {
  eligible: boolean
  reasonsOfIneligibility?: string[]
  co2AnnualEconomy?: number
}
