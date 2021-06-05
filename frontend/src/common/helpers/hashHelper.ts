const keyHash = 'access_hash';

export const getHash = (): string | null => {
  return window.localStorage.getItem(keyHash);
};

export const setHash = (): void => {
  console.log('window.location: ', window.location);
  const pathArr = window.location.pathname.split('/');
  const hash =
    pathArr[pathArr.length - 1] === ''
      ? pathArr[pathArr.length - 2]
      : pathArr[pathArr.length - 1];
  // window.localStorage.setItem(keyHash, hash);
  window.localStorage.setItem(
    keyHash,
    '4WwUyKfu3zTNrxg_jFXjAoP8ZLA6Op3zO6a02qb42YE',
  );
};

export const clearHash = (): void => {
  window.localStorage.removeItem(keyHash);
};
