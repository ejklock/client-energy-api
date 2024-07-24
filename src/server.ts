import cors from '@fastify/cors'

import fastify from 'fastify'

import { fastifySwagger } from '@fastify/swagger'
import { registerRoutesPlugin } from './plugins/register-routes.plugin'
import { swaggerUiPlugin } from './plugins/swagger-ui.plugin'

const port = Number(process.env.PORT) || 3000
const host = process.env.HOST || 'localhost'

export function getServer() {
  const app = fastify({ logger: true })

  app.register(cors, {
    origin: '*',
  })

  app.register(fastifySwagger, {
    mode: 'dynamic',
    prefix: '/docs',

    openapi: {
      info: {
        title: 'Client Energy Eligibility Check API',
        version: '0.1.0',
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
    // swagger: {
    //   schemes: ['http'],
    //   consumes: ['application/json'],
    //   produces: ['application/json'],
    //   tags: [{ name: 'eligibility', description: 'Client Eligibility API' }],
    //   info: {
    //     title: 'Client Energy Eligibility Check API',
    //     version: '0.1.0',
    //   },
    // },
  })

  app.register(swaggerUiPlugin)
  app.register(registerRoutesPlugin)

  return app
}

const start = async () => {
  try {
    const server = getServer()
    await server.listen({ port, host })
    await server.ready()

    console.log(`HTTP Server running on http://${host}:${port}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (process.env.NODE_ENV !== 'test') {
  start()
}
