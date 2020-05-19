export const actions = new Map();

// akcja zamkniecia taba
export const closeTabAction = 'closeTab';
// akcja przełączenia taba
export const changeTabAction = 'changeTab';
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

// akcje dotyczące filtra zaawansowanego
export const filterOpenAction = 'filterOpen';
export const filterConfirmAction = 'filterConfirm';
export const filterSelectResultAction = 'filterSelectResult';

// akcje cyklu tworzenia subofert i wersji
export const addSubofferAction = 'addSuboffer';
export const editSubofferAction = 'editSuboffer';

actions.set('closeTabAction', closeTabAction);
actions.set('changeTabAction', changeTabAction);
actions.set('buttonClickAction', buttonClickAction);
actions.set('linkClickAction', linkClickAction);
actions.set('homeAction', homeAction);
actions.set('infoAction', infoAction);
actions.set('logoutAction', logoutAction);
actions.set('addSubofferAction', addSubofferAction);
actions.set('editSubofferAction', editSubofferAction);
actions.set('filterOpenAction', filterOpenAction);
actions.set('filterConfirmAction', filterConfirmAction);
actions.set('filterSelectResultAction', filterSelectResultAction);
