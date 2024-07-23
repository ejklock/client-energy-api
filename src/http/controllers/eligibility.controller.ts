import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkClientEligibility(
  req: FastifyRequest,
  res: FastifyReply,
) {
  return 'Hello from eligibility'
}
