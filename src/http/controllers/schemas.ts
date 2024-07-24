import { Static, Type } from '@sinclair/typebox'
import {
  ConnectionTypesEnum,
  ConsumeClassesEnum,
  TaxModalityEnum,
} from '../../domains/eligibility/eligibility.types'
import { FastifySchema } from 'fastify'

const body = Type.Object({
  documentNumber: Type.String(),
  connectionType: Type.Enum(ConnectionTypesEnum),
  taxModality: Type.Enum(TaxModalityEnum),
  consumeClass: Type.Enum(ConsumeClassesEnum),
  consumptionMonthHistory: Type.Array(Type.Number()),
})

const response = Type.Object({
  eligible: Type.Boolean(),
  reasonsOfIneligibility: Type.Array(Type.String()),
  co2AnnualEconomy: Type.Number(),
})

export type TBody = Static<typeof body>
export const schema: FastifySchema = {
  tags: ['Eligibility'],
  body: Type.Strict(body),
  response: {
    200: Type.Strict(response),
  },
}
