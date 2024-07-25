import { Static, Type } from '@sinclair/typebox'
import {
  ConnectionTypesEnum,
  ConsumeClassesEnum,
  TaxModalityEnum,
} from '../../domains/eligibility/eligibility.types'
import { FastifySchema } from 'fastify'

const body = Type.Object({
  documentNumber: Type.String({ examples: ['49859754000190'] }),
  connectionType: Type.Enum(ConnectionTypesEnum, { examples: ['BI_PHASE'] }),
  consumeClass: Type.Enum(ConsumeClassesEnum, { examples: ['COMERCIAL'] }),
  taxModality: Type.Enum(TaxModalityEnum, { examples: ['CONVENTIONAL'] }),

  consumptionMonthHistory: Type.Array(Type.Number(), {
    examples: [
      [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    ],
  }),
})

const response = Type.Object({
  eligible: Type.Boolean(),
  reasonsOfIneligibility: Type.Array(Type.String()),
  co2AnnualEconomy: Type.Number(),
})

export type TBody = Static<typeof body>
export const checkEligibilitySchema: FastifySchema = {
  tags: ['Eligibility'],
  body: Type.Strict(body),
  response: {
    200: Type.Strict(response),
  },
}
