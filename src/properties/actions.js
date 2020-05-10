export const actions = new Map();

// akcja zamkniecia taba
export const closeTabAction = 'closeTab';
// akcja przejscia z opcji menu do wybranego modułu
export const buttonClickAction = 'buttonRedirect';
// akcja przejscia z notyfikacji menu do danej sekcji w module
export const linkClickAction = 'linkRedirect';
// akcja przejścia do menu głównego aplikacji
export const homeAction = 'home';
// akcja otwierająca modal z informacją o użytkowniku
export const infoAction = 'info';
// akcja wylogowania z systemu
export const logoutAction = 'logout';

actions.set('closeTabAction', closeTabAction);
actions.set('buttonClickAction', buttonClickAction);
actions.set('linkClickAction', linkClickAction);
actions.set('homeAction', homeAction);
actions.set('infoAction', infoAction);
actions.set('logoutAction', logoutAction);
