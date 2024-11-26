// app/lib/tempStore.ts
if (!global.tempDataStore) {
    global.tempDataStore = new Map();
  }
  
  export const tempDataStore = global.tempDataStore;