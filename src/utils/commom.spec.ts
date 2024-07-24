import { describe, expect, it } from 'vitest'
import {
  calculateAverageConsumption,
  calculateCo2YearSaving,
  errorResponse,
  isValidDocumentCpfCnpj,
  successResponse,
} from './common'
import { BaseEntity } from '../domains/common/base.entity'

class TestEntity extends BaseEntity<TestEntity> {
  name: string

  constructor(name: string) {
    super()
    this.name = name
  }
}
describe('Common Utils', () => {
  it('should calculate co2 year saving', () => {
    const co2YearSaving = calculateCo2YearSaving(100)
    expect(co2YearSaving).toBe(100.8)
  })

  it('is valid CNPJ', () => {
    expect(isValidDocumentCpfCnpj('53074947000103')).toBe(true)
  })

  it('is not valid CNPJ', () => {
    expect(isValidDocumentCpfCnpj('53074947000102')).toBe(false)
  })

  it('is valid CPF', () => {
    expect(isValidDocumentCpfCnpj('49859754000190')).toBe(true)
  })

  it('is not valid CPF', () => {
    expect(isValidDocumentCpfCnpj('49859754000191')).toBe(false)
  })

  it('should return 0 if consumption history is empty', () => {
    const averageConsumption = calculateAverageConsumption([])
    expect(averageConsumption).toBe(0)
  })

  it('should calculate average consumption', () => {
    const averageConsumption = calculateAverageConsumption([100, 200, 300])
    expect(averageConsumption).toBe(200)
  })

  it('validate success response', () => {
    const test = new TestEntity('test')
    const response = {
      ...successResponse({ data: test }),
    }

    expect(response).toEqual({
      success: true,
      data: test,
      message: 'Success',
    })
  })

  it('validate error response', () => {
    const response = errorResponse('Error', 500)
    expect(response).toEqual({
      success: false,
      statusCode: 500,
      message: 'Error',
    })
  })
})
