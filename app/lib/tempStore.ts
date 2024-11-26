export {};

declare global {
  var globalTempStore: Map<any, any>;
}

if (!global.globalTempStore) {
  global.globalTempStore = new Map();
}

export const globalTempStore = global.globalTempStore;