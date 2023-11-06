import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate_store')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate_store', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await openDB('jate_db', 1);
  const tx = db.transaction('jate_store', 'readwrite');
  const store = tx.objectStore('jate_store');
  await store.add(content);
  await tx.done;
  console.log('Added content to the database:', content);
}

export const getDb = async () => {
  const db = await openDB('jate_db', 1);
  const tx = db.transaction('jate_store', 'readonly');
  const store = tx.objectStore('jate_store');
  const content = await store.getAll();
  await tx.done;
  console.log('Retrieved content from the database:', content);
}

initdb();
