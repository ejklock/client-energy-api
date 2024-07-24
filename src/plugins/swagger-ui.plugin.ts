import fastifyApiReference from '@scalar/fastify-api-reference'
import { FastifyInstance } from 'fastify'

export async function swaggerUiPlugin(app: FastifyInstance) {
  return await app.register(fastifyApiReference, {
    routePrefix: '/docs',
    configuration: {
      metaData: {
        title: 'Client Energy API',
        description:
          'API documentation for Client Energy Eligibility Check API',
      },
      layout: 'classic',
      spec: {
        content: () => app.swagger(),
      },
    },
  })
}
