import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifySchemaValidationError } from 'fastify/types/schema'

function formatValidationErrors(errors: FastifySchemaValidationError[]) {
  const errorMap: Record<string, Set<string>> = {}

  errors.forEach((error) => {
    const path = error.instancePath
    const key = `${path}`

    if (
      error.keyword === 'const' &&
      typeof error.params?.allowedValue === 'string'
    ) {
      if (!errorMap[key]) {
        errorMap[key] = new Set()
      }
      errorMap[key].add(error.params.allowedValue)
    }
  })

  const formattedErrors = Object.keys(errorMap).map((path) => {
    const allowedValues = Array.from(errorMap[path]).join(', ')
    const message = `Allowed values: [${allowedValues}]`
    return { path, message }
  })

  return formattedErrors
}

export const errorHandlerPlugin = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error?.validation) {
    const validationErrors = formatValidationErrors(error.validation)
    return reply.status(422).send({
      statusCode: 422,
      error: 'Unprocessable Entity',
      message: 'Validation failed',
      errors: validationErrors,
    })
  }

  if (
    error.statusCode !== undefined &&
    error.statusCode >= 400 &&
    error.statusCode < 500
  ) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: 'Bad Request',
      message: error.message,
    })
  }

  reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  })
}
