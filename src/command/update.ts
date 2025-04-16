import * as readlineSync from 'readline-sync';
import { CrudController } from '../controller/crudcontroller';

export async function update() {
  const items = CrudController.read();

  if (items.length === 0) {
    console.log('No items to update.');
    return;
  }

  // Show existing items with IDs
  console.log('\nCurrent items:');
  items.forEach(item => {
    console.log(`ID: ${item.id} | ${item.firstName} ${item.lastName}`);
  });

  const idToUpdate = readlineSync.questionInt('\nEnter the ID of the item to update: ');

  const item = items.find(p => p.id === idToUpdate);
  if (!item) {
    console.log('Item with that ID not found.');
    return;
  }

  const newFirstName = readlineSync.question('Enter new first name: ').trim();
  const newLastName = readlineSync.question('Enter new last name: ').trim();

  if (!newFirstName || !newLastName) {
    console.log('First name and last name cannot be empty.');
    return;
  }

  const updatedItem = await CrudController.update(idToUpdate, newFirstName, newLastName);

  if (updatedItem) {
    console.log(`Updated: ${updatedItem.firstName} ${updatedItem.lastName}`);
  } else {
    console.log('Failed to update item.');
  }
}
