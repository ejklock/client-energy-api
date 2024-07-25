import { EligibilityConfigEntity } from './eligibility-config.entity'
import { InMemoryRepository } from '../common/in-memory.repository'

export class EligibilityConfigRepository extends InMemoryRepository<EligibilityConfigEntity> {}
