import { CrudController } from '../controller/crudcontroller';

export function read() {
  const items = CrudController.read();
  if (items.length === 0) {
    console.log('No items found.');
  } else {
    items.forEach((item) => {
      console.log(`ID: ${item.id} | ${item.firstName} ${item.lastName}`);
    });
  }
}
