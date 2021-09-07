import {
  defaultShowBackground,
  defaultShowSubscription,
  defaultTheme,
} from '../config';

const paramShowSubscription = 'subscription';
const paramShowBackground = 'background';
const paramTheme = 'theme';

const keyShowSubscription = 'show_subscription';
const keyShowBackground = 'show_background';
const keyTheme = 'theme';

export interface Settings {
  showSubscription: boolean;
  showBackground: boolean;
  theme: string;
}

function parseParam(param: string) {
  if (param) {
    switch (param) {
      case 'false': {
        return false;
      }
      case 'true': {
        return true;
      }
    }
  }
  return false;
}

export const getSettings = (): Settings => {
  const subscription = sessionStorage.getItem(keyShowSubscription);
  const background = sessionStorage.getItem(keyShowBackground);
  const theme = sessionStorage.getItem(keyShowBackground);

  return {
    showSubscription:
      subscription !== null
        ? parseParam(subscription)
        : defaultShowSubscription,
    showBackground:
      background !== null ? parseParam(background) : defaultShowBackground,
    theme: theme !== null ? theme : defaultTheme,
  };
};

export const fetchSettings = (): void => {
  const rootElement = document.getElementById('aw-player');
  let subscription = null;
  let background = null;
  let theme = null;

  if (rootElement) {
    subscription = rootElement.dataset[paramShowSubscription];
    background = rootElement.dataset[paramShowBackground];
    theme = rootElement.dataset[paramTheme];
  } else {
    const params = new URLSearchParams(document.location.search);

    subscription = params.get(paramShowSubscription);
    background = params.get(paramShowBackground);
    theme = params.get(paramTheme);
  }

  if (subscription) sessionStorage.setItem(keyShowSubscription, subscription);
  if (background) sessionStorage.setItem(keyShowSubscription, background);
  if (theme) sessionStorage.setItem(keyTheme, theme);
};

export const setSettings = (settings: Settings): void => {};

export const clearSettings = (): void => {};
