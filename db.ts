
import { openDB, IDBPDatabase } from 'idb';
import { Card } from '../types';

const DB_NAME = 'card-studio-db';
const STORE_NAME = 'cards';
const SETTINGS_STORE = 'settings';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
        db.createObjectStore(SETTINGS_STORE);
      }
    },
  });
}

export async function saveCard(card: Card) {
  const db = await initDB();
  await db.put(STORE_NAME, card);
}

export async function getCard(id: string): Promise<Card | undefined> {
  const db = await initDB();
  return db.get(STORE_NAME, id);
}

export async function getAllCards(): Promise<Card[]> {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function deleteCard(id: string) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}

export async function saveSettings(settings: any) {
  const db = await initDB();
  await db.put(SETTINGS_STORE, settings, 'app-settings');
}

export async function getSettings() {
  const db = await initDB();
  return db.get(SETTINGS_STORE, 'app-settings');
}
