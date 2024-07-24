import { FastifyInstance } from 'fastify'
import { errorResponse } from '../utils/common'

export default async function replyErrorHandlerPlugin(app: FastifyInstance) {
  return app.setErrorHandler((error, request, reply) => {
    if (error.statusCode >= 400 && error.statusCode < 500) {
      return reply.status(error.statusCode).send(errorResponse(error.message))
    }
  })
}
