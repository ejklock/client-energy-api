interface IRepository<T> {
  firstOrFail(): T
  findAll(): T[]
  findById(id: number): T | undefined
  save(entity: T): void
  saveMany(entities: T[]): void
  delete(id: number): void
}
