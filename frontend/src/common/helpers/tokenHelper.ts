const keyToken = 'access_token';

export const getToken = (): string | null => {
  return (
    window.localStorage.getItem(keyToken) ||
    window.sessionStorage.getItem(keyToken)
  );
};

export const setToken = (token: string, save: boolean = true): void => {
  const storage = save ? window.localStorage : window.sessionStorage;
  storage.setItem(keyToken, token);
};

export const clearToken = (): void => {
  window.localStorage.removeItem(keyToken);
  window.sessionStorage.removeItem(keyToken);
};
