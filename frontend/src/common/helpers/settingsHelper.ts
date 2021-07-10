const keyShowSubscription = 'show_subscription';
const keyShowBackground = 'show_background';

export interface Settings {
  showSubscription: boolean;
  showBackground: boolean;
}

export const getSettings = (): Settings => {
  return {
    showSubscription: false,
    showBackground: true,
  };
};

export const setSettings = (settings: Settings): void => {};

export const clearSettings = (): void => {};
