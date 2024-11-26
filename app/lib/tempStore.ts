export {};

declare global {
  var globalTempStore: Map<string, any>;
}

if (!global.globalTempStore) {
  global.globalTempStore = new Map();
}

export const tempDataStore = global.globalTempStore;