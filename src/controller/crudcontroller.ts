// src/controller/crudcontroller.ts
import { createItem, readItems, updateItem, deleteItem, Person } from '../services/crudeservice';

export class CrudController {
  static create(firstName: string, lastName: string): Person {
    return createItem(firstName, lastName);
  }

  static read(): Person[] {
    return readItems();
  }

  static update(id: number, firstName: string, lastName: string): Person | null {
    return updateItem(id, firstName, lastName);
  }

  static delete(id: number): Person | null {
    return deleteItem(id);
  }
}
