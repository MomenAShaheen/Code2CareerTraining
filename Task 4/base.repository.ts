// base.repository.ts
import { IRepository } from './repository.interface';
import { BaseEntity } from './models';

export abstract class BaseRepository<T extends BaseEntity> implements IRepository<T> {
  protected items: T[];

  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }

  async getAll(): Promise<T[]> {
    return [...this.items];
  }

  async getById(id: string): Promise<T | undefined> {
    return this.items.find(item => item.id === id);
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const newItem = { ...item, id: this.generateId() } as T;
    this.items.push(newItem);
    return newItem;
  }

  async update(id: string, item: Partial<T>): Promise<T | undefined> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...this.items[index], ...item, id };
    this.items[index] = updatedItem;
    return updatedItem;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.id !== id);
    return this.items.length !== initialLength;
  }

  async find(filter: Partial<T>): Promise<T[]> {
    return this.items.filter(item => {
      return Object.keys(filter).every(key => {
        return item[key as keyof T] === filter[key as keyof T];
      });
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}