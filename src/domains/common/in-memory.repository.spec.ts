import { describe, expect, it } from 'vitest'
import { BaseEntity } from './base.entity'
import { InMemoryRepository } from './in-memory.repository'

class TestEntity extends BaseEntity {
  name: string
  constructor(name: string) {
    super()
    this.name = name
  }
}

class TestEntityRepository extends InMemoryRepository<TestEntity> {}

describe('in-memory repository', () => {
  it('should save an entity', () => {
    const repository = new TestEntityRepository()
    repository.save(new TestEntity('test'))
    expect(repository.findAll()).toHaveLength(1)
  })

  it('should find entity by id', () => {
    const repository = new TestEntityRepository()
    const result = repository.save(new TestEntity('test'))
    expect(repository.findById(result.id)).toBeDefined()
  })

  it('should save many entities', () => {
    const repository = new TestEntityRepository()
    repository.saveMany([
      new TestEntity('test1'),
      new TestEntity('test2'),
      new TestEntity('test3'),
    ])
    expect(repository.findAll()).toHaveLength(3)
  })

  it('should find an entity by id', () => {
    const repository = new TestEntityRepository()
    const result = repository.save(new TestEntity('test'))
    expect(result).toBeDefined()
  })

  it('should find all entities', () => {
    const repository = new TestEntityRepository()
    repository.saveMany([
      new TestEntity('test1'),
      new TestEntity('test2'),
      new TestEntity('test3'),
    ])
    expect(repository.findAll()).toHaveLength(3)
  })

  it('should delete an entity', () => {
    const repository = new TestEntityRepository()
    const result = repository.save(new TestEntity('test'))
    repository.delete(result.id)
    expect(repository.findAll()).toHaveLength(0)
  })

  it('should return false if entity not found', () => {
    const repository = new TestEntityRepository()
    expect(repository.delete(1)).toEqual(false)
  })

  it('should throw error has no entity on firstOrFail', () => {
    const repository = new TestEntityRepository()
    expect(() => repository.firstOrFail()).toThrowError('Item not found')
  })
})
