import * as readlineSync from 'readline-sync';
import { CrudController } from '../controller/crudcontroller';

export async function del() {
  const idToDelete = readlineSync.questionInt('Enter the ID of the item to delete: ');
  const success = await CrudController.delete(idToDelete);

  if (success) {
    console.log(`Item with ID ${idToDelete} deleted successfully.`);
  } else {
    console.log('Item not found or failed to delete.');
  }
}
