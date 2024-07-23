import cors from '@fastify/cors'

import fastify from 'fastify'

import { errorResponse } from './utils/common'
import { eligibilityRoutes } from './http/routes/eligibility.routes'

const port = Number(process.env.PORT) || 3000
const host = process.env.HOST || 'localhost'

export function getServer() {
  const app = fastify({ logger: true })

  app.register(cors, {
    origin: '*',
  })
  app.setReplySerializer((payload: Record<string, unknown>) => {
    const {
      success = true,
      message = 'OK',
      data = null,
      links = null,
      meta = null,
    } = payload

    return JSON.stringify({ success, message, data, links, meta })
  })

  app.setErrorHandler((error, request, reply) => {
    if (error.statusCode >= 400 && error.statusCode < 500) {
      return reply.status(error.statusCode).send(errorResponse(error.message))
    }
  })

  app.register(eligibilityRoutes, {
    prefix: 'api/v1/eligibility',
  })

  app.get('/', (_, reply) => reply.send('Hello'))

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
