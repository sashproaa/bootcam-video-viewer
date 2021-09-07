const keyHash = 'access_hash';

export const getHash = (): string | null => {
  return sessionStorage.getItem(keyHash);
};

export const setHash = (): void => {
  const rootElement = document.getElementById('aw-player');
  let hash = null;

  if (rootElement) {
    hash = rootElement.dataset.hash;
  } else {
    const pathArr = window.location.pathname.split('/');
    hash =
      pathArr[pathArr.length - 1] === ''
        ? pathArr[pathArr.length - 2]
        : pathArr[pathArr.length - 1];
  }

  if (hash) sessionStorage.setItem(keyHash, hash);

  // sessionStorage.setItem(
  //   keyHash,
  //   '4WwUyKfu3zTNrxg_jFXjAoP8ZLA6Op3zO6a02qb42YE',
  // );
};

export const clearHash = (): void => {
  sessionStorage.removeItem(keyHash);
};
