import { FastifyInstance } from 'fastify'
import { checkClientEligibility } from '../controllers/eligibility.controller'
import {
  ConnectionTypesEnum,
  ConsumeClassesEnum,
  TaxModalityEnum,
} from '../../domains/eligibility/eligibility.types'
import { example } from 'yargs'

export async function eligibilityRoutes(app: FastifyInstance) {
  return app.post(
    '/check',
    {
      schema: {
        description: 'Check client eligibility for energy plan',
        tags: ['eligibility'],
        body: {
          type: 'object',

          properties: {
            documentNumber: {
              type: 'string',
              examples: ['49859754000190'],
            },
            connectionType: {
              type: 'string',
              enum: Object.keys(ConnectionTypesEnum),
            },
            taxModality: { type: 'string', enum: Object.keys(TaxModalityEnum) },
            consumeClass: {
              type: 'string',
              enum: Object.keys(ConsumeClassesEnum),
            },
            consumptionMonthHistory: {
              type: 'array',
              items: { type: 'number' },
            },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  eligible: { type: 'boolean' },
                  reasonsOfIneligibility: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  co2AnnualEconomy: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    checkClientEligibility,
  )
}
