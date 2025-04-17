import { create } from './command/create';
import { read } from './command/read';
import { update } from './command/update';
import { del } from './command/delete';
import * as readline from 'readline';

// Setup readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  rl.question(
    'Choose an action (Create, Read, Update, Delete, Exit): ',
    async (action) => {
      // Normalize action to lowercase to make it case insensitive
      const actionLower = action.trim().toLowerCase();

      // Handle user input for the corresponding actions
      switch (actionLower) {
        case 'create':
          await create();  // Create a new item
          break;
        case 'read':
          await read();    // Read and display items
          break;
        case 'update':
          await update();  // Update an item
          break;
        case 'delete':
          await del();     // Delete an item
          break;
        case 'exit':
          console.log('Exiting...');
          rl.close();
          return;
        default:
          console.log('Invalid choice, please try again.');
      }

      // Recursively call main to prompt user again
      main();
    }
  );
}

main();
