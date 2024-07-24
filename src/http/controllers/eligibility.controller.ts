import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller, GET, POST } from 'fastify-decorators'
import { EligibilityService } from '../../domains/eligibility/eligibility.service'
import { schema } from './schemas'

@Controller({
  route: '/eligibility',
  tags: [{ name: 'Eligibility' }],
})
export default class EligibilityController {
  private readonly eligibilityService: EligibilityService
  constructor() {
    this.eligibilityService = new EligibilityService()
  }

  @POST('/check', { schema })
  async checkClientEligibility(req: FastifyRequest, res: FastifyReply) {
    console.log(req.body)
    return 'Hello from eligibility'
  }
}
