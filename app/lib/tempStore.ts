export {};

declare global {
  // eslint-disable-next-line no-var
  var globalTempStore: Map<any, any>;
}

if (!global.globalTempStore) {
  global.globalTempStore = new Map();
}

export const tempDataStore = global.globalTempStore;