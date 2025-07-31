// repository.interface.ts
import { BaseEntity } from './models';

export interface IRepository<T extends BaseEntity> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  create(item: Omit<T, 'id'>): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | undefined>;
  delete(id: string): Promise<boolean>;
  find(filter: Partial<T>): Promise<T[]>;
}