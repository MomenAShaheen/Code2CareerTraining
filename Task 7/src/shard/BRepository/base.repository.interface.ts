import { BaseEntity } from "./base.entity";

export interface IBaseRepository<T extends BaseEntity> {
  getAll(): T[];
  getById(id: string): T | undefined;
  create(item: Omit<T, "id">): T;
  update(id: string, item: Partial<T>): T | undefined;
  delete(id: string): boolean;
  find(filter: Partial<T>): T[] | undefined;
}
