// app/lib/tempStore.ts
declare global {
  var globalTempStore: Map<string, any> | undefined;  // Use var here as let/const don't work with global
}

if (typeof global !== 'undefined' && !global.globalTempStore) {
  global.globalTempStore = new Map<string, any>();
}

export const tempDataStore = (global.globalTempStore as Map<string, any>) || new Map<string, any>();