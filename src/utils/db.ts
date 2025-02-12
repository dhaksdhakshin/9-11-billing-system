// src/utils/db.ts
import { openDB } from 'idb';

export const dbPromise = openDB('ProductDB', 1, {
  upgrade(db) {
    const store = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
    store.createIndex('barcode', 'barcode', { unique: true });
  },
});

export const addProduct = async (product) => {
  const db = await dbPromise;
  const tx = db.transaction('products', 'readwrite');
  await tx.store.add(product);
  await tx.done;
};

export const updateProduct = async (product) => {
  const db = await dbPromise;
  const tx = db.transaction('products', 'readwrite');
  await tx.store.put(product);
  await tx.done;
};

export const deleteProduct = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction('products', 'readwrite');
  await tx.store.delete(id);
  await tx.done;
};

export const getProducts = async () => {
  const db = await dbPromise;
  return await db.getAll('products');
};
