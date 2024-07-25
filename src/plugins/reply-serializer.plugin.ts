export const replySerializerPlugin = (payload: unknown, statusCode: number) => {
  const { errors = null } = payload as Record<string, unknown>

  return JSON.stringify({
    success: statusCode < 400,
    message: statusCode < 400 ? 'Ok' : 'Error',
    ...(statusCode < 400 ? { payload } : { errors }),
  })
}
