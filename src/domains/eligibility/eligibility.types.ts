export enum ConnectionTypesEnum {
  SINGLE_PHASE,
  BI_PHASE,
  THREE_PHASE,
}

export enum ConsumeClassesEnum {
  RESIDENTIAL,
  INDUSTRY,
  COMERCIAL,
  RURAL,
  GOVERNMENT,
}

export enum TaxModalityEnum {
  BLUE,
  WHITE,
  GREEN,
  CONVENTIONAL,
}

export type ClientEligibilityData = {
  documentNumber: number
  connectionType: ConnectionTypesEnum
  taxModality: TaxModalityEnum
  consumeClass: ConsumeClassesEnum
  consumptionMonthHistory: number[]
}
