import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller, POST } from 'fastify-decorators'
import { EligibilityService } from '../../domains/eligibility/eligibility.service'
import { checkEligibilitySchema } from './schemas'
import { ClientEligibilityData } from '../../domains/eligibility/eligibility.types'

@Controller({
  route: '/eligibility',
  tags: [{ name: 'Eligibility' }],
})
export default class EligibilityController {
  private readonly eligibilityService: EligibilityService
  constructor() {
    this.eligibilityService = new EligibilityService()
  }

  @POST('/check', { schema: checkEligibilitySchema })
  async checkClientEligibility(req: FastifyRequest, res: FastifyReply) {
    const {
      documentNumber,
      connectionType,
      consumeClass,
      taxModality,
      consumptionMonthHistory,
    } = req.body as ClientEligibilityData

    res.send(
      this.eligibilityService.checkClientEligibility({
        documentNumber,
        connectionType,
        consumeClass,
        taxModality,
        consumptionMonthHistory,
      }),
    )
  }
}
