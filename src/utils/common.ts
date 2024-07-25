import { isCPFOrCNPJ } from 'brazilian-values'

const CO2_EMISSION_PER_1000_KWH = 84

export function successResponse<T>({
  message = 'Success',
  data,
}: { message?: string; data?: T | undefined } = {}): {
  success: boolean
  message: string
  data?: T
} {
  return {
    success: true,
    message,
    ...(data && { data }),
  }
}

export function errorResponse(
  message: string,
  statusCode: number = 500,
): { statusCode: number; success: boolean; message: string } {
  return {
    success: false,
    statusCode,
    message,
  }
}

export function calculateAverageConsumption(
  monthsConsumption: number[],
): number {
  if (monthsConsumption.length === 0) return 0
  const total = monthsConsumption.reduce((prev, curr) => prev + curr, 0)
  return total / monthsConsumption.length
}

export function isValidDocumentCpfCnpj(cpfCnpj: string): boolean {
  return isCPFOrCNPJ(cpfCnpj)
}

export function calculateCo2YearSaving(averageConsumption: number): number {
  const annualConsumption = averageConsumption * 12
  return (annualConsumption / 1000) * CO2_EMISSION_PER_1000_KWH
}
