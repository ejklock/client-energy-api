import Fastify from 'fastify'

import { afterAll, beforeAll } from 'vitest'
export const fastify = Fastify({ logger: false })

beforeAll(async () => {
  await fastify.listen({ port: 0 })
})

afterAll(async () => {
  await fastify.close()
})
