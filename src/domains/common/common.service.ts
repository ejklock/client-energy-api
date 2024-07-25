import { IRepository } from './commom.interfaces'

export abstract class BaseService<T> {
  protected repository: IRepository<T>
  constructor(repository: IRepository<T>) {
    this.repository = repository
  }

  getRepository(): IRepository<T> {
    return this.repository
  }
}
