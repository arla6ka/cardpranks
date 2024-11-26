export {};

declare global {
  var globalTempStore: Map<any, any>;
}

if (!global.globalTempStore) {
  global.globalTempStore = new Map();
}

export const tempDataStore = global.globalTempStore;  // Экспортируем с старым именем для обратной совместимости