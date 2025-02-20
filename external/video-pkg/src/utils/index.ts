export function getApi(apiMap: Map<string, string>, key?: string) {
  if (key && apiMap.has(key)) {
    return apiMap.get(key);
  }
  return apiMap.get(
    Array.from(apiMap.keys())[Math.floor(Math.random() * apiMap.size)]
  );
}
