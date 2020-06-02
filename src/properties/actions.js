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
export const saveSubofferAction = 'saveSuboffer';
export const validateSubofferAction = 'validateSuboffer';   // akcja bez mapowania w actions2events
export const removeSubofferAction = 'removeSuboffer';
export const copySubofferAction = 'copySuboffer'; 
export const addVersionAction = 'addVersion';
export const publishTestAction = 'publishTest';
export const publishProdAction = 'publishProd';
export const saveVersionAction = 'saveVersion';
export const validateVersionAction = 'validateVersion';     // akcja bez mapowania w actions2events
export const removeVersionAction = 'removeVersion';
export const copyVersionAction = 'copyVersion';
export const approveVersionAction = 'approveVersion';

actions.set('closeTabAction', closeTabAction);
actions.set('changeTabAction', changeTabAction);
actions.set('buttonClickAction', buttonClickAction);
actions.set('linkClickAction', linkClickAction);
actions.set('homeAction', homeAction);
actions.set('infoAction', infoAction);
actions.set('logoutAction', logoutAction);
actions.set('addSubofferAction', addSubofferAction);
actions.set('editSubofferAction', editSubofferAction);
actions.set('saveSubofferAction', saveSubofferAction);
actions.set('validateSubofferAction', validateSubofferAction);
actions.set('removeSubofferAction', removeSubofferAction);
actions.set('copySubofferAction', copySubofferAction);
actions.set('addVersionAction', addVersionAction);
actions.set('publishTestAction', publishTestAction);
actions.set('publishProdAction', publishProdAction);
actions.set('saveVersionAction', saveVersionAction);
actions.set('validateVersionAction', validateVersionAction);
actions.set('removeVersionAction', removeVersionAction);
actions.set('copyVersionAction', copyVersionAction);
actions.set('approveVersionAction', approveVersionAction);
actions.set('filterOpenAction', filterOpenAction);
actions.set('filterConfirmAction', filterConfirmAction);
actions.set('filterSelectResultAction', filterSelectResultAction);
