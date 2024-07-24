export abstract class BaseService<T> {
  constructor(protected readonly repository: IRepository<T>) {}
}
