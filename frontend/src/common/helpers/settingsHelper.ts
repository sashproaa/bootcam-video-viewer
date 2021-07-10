const keyShowSubscription = 'show_subscription';
const keyShowBackground = 'show_background';

export interface Settings {
  showSubscription: boolean;
  showBackground: boolean;
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

  const settings: Settings = {
    showSubscription: subscription !== null ? parseParam(subscription) : false,
    showBackground: background !== null ? parseParam(background) : true,
  };

  return settings;
};

export const fetchSettings = (): void => {
  const rootElement = document.getElementById('aw-player');
  let subscription = null;
  let background = null;

  if (rootElement) {
    subscription = rootElement.dataset.subscription;
    background = rootElement.dataset.background;
  } else {
    const params = new URLSearchParams(document.location.search);

    subscription = params.get('subscription');
    background = params.get('background');
  }

  if (subscription) sessionStorage.setItem(keyShowSubscription, subscription);
  if (background) sessionStorage.setItem(keyShowSubscription, background);
};

export const setSettings = (settings: Settings): void => {};

export const clearSettings = (): void => {};
