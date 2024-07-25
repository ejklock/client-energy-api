import cors from '@fastify/cors'
import fastify from 'fastify'
import { fastifyEnv } from '@fastify/env'
import { fastifySwagger } from '@fastify/swagger'
import { swaggerUiPlugin } from './plugins/swagger-ui.plugin'
import { bootstrap } from 'fastify-decorators'
import { errorHandlerPlugin } from './plugins/error-handler.plugin'
import { replySerializerPlugin } from './plugins/reply-serializer.plugin'

import path from 'path'

// Assuming you're running this file directly, you can set __dirname directly
const dname = path.resolve() // Use this only if you know __dirname is not available

type Envs = {
  HOST: string
  PORT: number
}

export async function getServer() {
  const app = fastify({ logger: true })

  const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
      PORT: {
        type: 'string',
        default: 3333,
      },
      HOST: {
        type: 'string',
        default: '127.0.0.1',
      },
    },
  }

  const options = {
    dotenv: true,
    schema,
  }

  await app.register(fastifyEnv, options)

  app.register(cors, {
    origin: '*',
  })
  app.setReplySerializer(replySerializerPlugin)
  app.setErrorHandler(errorHandlerPlugin)

  app.register(fastifySwagger, {
    mode: 'dynamic',
    prefix: '/',

    openapi: {
      info: {
        title: 'Client Energy Eligibility Check API',
        version: '0.1.0',
      },
    },
  })
  app.register(bootstrap, {
    prefix: '/api/v1',
    directory: path.join(dname, 'src', 'http', 'controllers'),
    mask: /\.controller\./,
  })
  app.register(swaggerUiPlugin)

  return app
}

const start = async () => {
  try {
    const server = await getServer()
    const { PORT, HOST } = server.getEnvs<Envs>() || {}
    await server.listen({ port: PORT, host: HOST })
    await server.ready()

    console.log(`HTTP Server running on http://${HOST}:${PORT}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (process.env.NODE_ENV !== 'test') {
  start()
}
