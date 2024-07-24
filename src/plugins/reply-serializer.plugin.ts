import { FastifyInstance } from 'fastify'

export async function replySerializerPlugin(app: FastifyInstance) {
  return app.setReplySerializer((payload: Record<string, unknown>) => {
    const {
      success = true,
      message = 'OK',
      data = null,
      links = null,
      meta = null,
    } = payload

    return JSON.stringify({ success, message, data, links, meta })
  })
}
