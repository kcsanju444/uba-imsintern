import * as fs from 'fs';
import * as path from 'path';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'db.json');

let data: Person[] = [];
let nextId = 1;

function ensureDataFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '[]', 'utf-8');
  }
}

function loadData(): Person[] {
  ensureDataFileExists();
  const rawData = fs.readFileSync(dbPath, 'utf-8');
  const items: Person[] = JSON.parse(rawData);

  nextId = items.length > 0
    ? Math.max(...items.map(i => i.id ?? 0)) + 1
    : 1;

  return items;
}

function saveData() {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

data = loadData();

// Create
export function createItem(firstName: string, lastName: string): Person {
  const newItem: Person = { id: nextId++, firstName, lastName };
  data.push(newItem);
  saveData();
  return newItem;
}

// Read
export function readItems(): Person[] {
  return data;
}

// Update by ID
export function updateItem(id: number, firstName: string, lastName: string): Person | null {
  const index = data.findIndex(p => p.id === id);
  if (index !== -1) {
    data[index] = { id, firstName, lastName };
    saveData();
    return data[index];
  }
  return null;
}

// Delete by ID
export function deleteItem(id: number): Person | null {
  const index = data.findIndex(p => p.id === id);
  if (index !== -1) {
    const [removed] = data.splice(index, 1);
    saveData();
    return removed;
  }
  return null;
}
