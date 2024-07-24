import { EligibilityConfigEntity } from './eligibility-config.entity'
import {
  ConsumeClassesEnum,
  TaxModalityEnum,
} from '../eligibility/eligibility.types'
import { InMemoryRepository } from '../common/in-memory.repository'

export class EligibilityConfigRepository extends InMemoryRepository<EligibilityConfigEntity> {}
