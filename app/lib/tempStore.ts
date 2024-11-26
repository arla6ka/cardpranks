// app/lib/tempStore.ts
declare global {
  var globalTempStore: Map<string, any>;
}

if (typeof global !== 'undefined' && !global.globalTempStore) {
  global.globalTempStore = new Map<string, any>();
}

export const tempDataStore = global.globalTempStore || new Map<string, any>();