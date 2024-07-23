import { FastifyInstance } from 'fastify'
import { checkClientEligibility } from '../controllers/eligibility.controller'

export async function eligibilityRoutes(app: FastifyInstance) {
  return app.post('/check', checkClientEligibility)
}
