export const uncachedRequire = <T>(path: string): T => {
  delete require.cache[require.resolve(path)];

  for (const cachedPath of Object.keys(require.cache)) {
    if (cachedPath.startsWith(path) || cachedPath.includes('drawer')) {
      delete require.cache[cachedPath];
    }
  }

  return require(path);
}
