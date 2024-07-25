import { BaseEntity } from './base.entity'
import { IRepository } from './commom.interfaces'

export abstract class InMemoryRepository<T extends BaseEntity>
  implements IRepository<T>
{
  protected idAutoIncrement = 1
  protected items: T[] = []

  firstOrFail(): T {
    if (this.items.length === 0) {
      throw new Error('Item not found')
    }
    return this.items[0]
  }

  findAll(): T[] {
    return this.items
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id)
  }

  save(entity: T): T {
    this.items.push({
      ...entity,
      id: this.idAutoIncrement++,
    })

    return this.firstOrFail()
  }

  saveMany(entities: T[]): void {
    entities.forEach((entity) =>
      this.save({
        ...entity,
        id: this.idAutoIncrement++,
      }),
    )
  }

  delete(id: number): boolean {
    const index = this.items.findIndex((item) => item.id === id)
    if (index !== -1) {
      this.items.splice(index, 1)
      return true
    }
    return false
  }
}
