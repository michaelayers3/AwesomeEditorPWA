import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  //do I need an ID here?
  const jateDb = await openDB('jate', 1);
  
  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');
  
  const request = store.put({content: content});
  //do I need an ID here?

  const result = await request;

  console.log('Data saved', result);
};


export const getDb = async () => {

const jateDb = await openDB('jate', 1);

const tx = jateDb.transaction('jate', 'readonly');

const store = tx.objectStore('jate');

const request = store.getAll();

const result = await request;

console.log('result.value', result);

return result;
};


initdb();
