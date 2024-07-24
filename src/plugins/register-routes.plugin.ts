import { FastifyInstance } from 'fastify'
import { eligibilityRoutes } from '../http/routes/eligibility.routes'

export async function registerRoutesPlugin(app: FastifyInstance) {
  app.register(eligibilityRoutes, {
    prefix: '/api/v1',
  })
}
