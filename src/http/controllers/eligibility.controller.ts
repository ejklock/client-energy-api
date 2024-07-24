import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkClientEligibility(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const { documentNumber, connectionType, taxModality, consumeClass } = req.body
  console.log(documentNumber, connectionType, taxModality, consumeClass)
  return 'Hello from eligibility'
}
