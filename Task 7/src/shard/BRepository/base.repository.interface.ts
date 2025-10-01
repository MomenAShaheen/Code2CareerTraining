import { BaseEntity } from "./base.entity";

export interface IBaseRepository<T extends BaseEntity> {
  getAll(): T[];
  getById(id: number): T | undefined;
  create(item: Omit<T, "id">): T;
  update(id: number, item: Partial<T>): T | undefined;
  delete(id: number): boolean;
  find(filter: Partial<T>): T[] | undefined;
}
