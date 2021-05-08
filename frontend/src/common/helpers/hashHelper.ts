const keyHash = 'access_hash';

export const getHash = (): string | null => {
  return window.localStorage.getItem(keyHash);
};

export const setHash = (): void => {
  const pathArr = window.location.pathname.split('/');
  const hash =
    pathArr[pathArr.length - 1] === ''
      ? pathArr[pathArr.length - 2]
      : pathArr[pathArr.length - 1];
  window.localStorage.setItem(keyHash, hash);
};

export const clearHash = (): void => {
  window.localStorage.removeItem(keyHash);
};
