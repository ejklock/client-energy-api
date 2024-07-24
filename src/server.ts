import cors from '@fastify/cors'

import fastify from 'fastify'

import { fastifySwagger } from '@fastify/swagger'
import { swaggerUiPlugin } from './plugins/swagger-ui.plugin'
import { bootstrap } from 'fastify-decorators'

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
  })
  app.register(bootstrap, {
    directory: new URL(`http/controllers`, import.meta.url),
    mask: /\.controller\./,
  })
  app.register(swaggerUiPlugin)

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
