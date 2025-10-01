import { BaseEntity } from "./base.entity";
import { IBaseRepository } from "./base.repository.interface";

export abstract class BaseRepository<T extends BaseEntity>
  implements IBaseRepository<T>
{
  protected items: T[] = [];

  // constructor(initItems: T[] = []) {
  //   this.items = initItems;
  // }

  constructor() {}

  getAll(): T[] {
    return [...this.items];
  }
  getById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }
  create(item: Omit<T, "id">): T {
    const newItem = { ...item, id: 0 } as T;
    this.items.push(newItem);
    return newItem;
  }
  update(id: number, item: Partial<T>): T | undefined {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) return undefined;
    const updatedItem = { ...this.items[index], ...item, id } as T;
    this.items[index] = updatedItem;
    return updatedItem;
  }
  delete(id: number): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length !== initialLength;
  }

  find(filter: Partial<T>): T[] | undefined {
    return this.items.filter((item) => {
      return Object.keys(filter).every((key) => {
        return item[key as keyof T] === filter[key as keyof T];
      });
    });
  }

  // private generateId(): number {
  //   return Math.random().tonumber(36).subnumber(2, 9);
  // }
}
