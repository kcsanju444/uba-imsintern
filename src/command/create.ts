// create.ts
import * as readlineSync from 'readline-sync';
import { CrudController } from '../controller/crudcontroller';

export async function create() {
  const firstName = readlineSync.question('Enter first name: ');
  const lastName = readlineSync.question('Enter last name: ');
  
  const newItem = await CrudController.create(firstName, lastName);  // Assuming CrudController.create() is async
  
  console.log(`Created: ${newItem.firstName} ${newItem.lastName}`);
}
