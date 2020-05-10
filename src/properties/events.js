export const events = new Map();

// event zamkniecia taba
export const closeTabEvent = 'evCloseTab';
// event przejscia z opcji menu do wybranego modułu
export const buttonClickEvent = 'evButtonRedirect';
// event przejscia z notyfikacji menu do danej sekcji w module
export const linkClickEvent = 'evLinkRedirect';
// event przejścia do menu głównego aplikacji
export const homeEvent = 'evHome';
// event otwierająca modal z informacją o użytkowniku
export const infoEvent = 'evInfo';
// event wylogowania z systemu
export const logoutEvent = 'evLogout';

// eventy wywoływane przey zamknieciu modala
export const confirmModalEvent = 'evConfirmModal';
export const cancelModalEvent = 'evCancelModal';

events.set('closeTabEvent', closeTabEvent);
events.set('buttonClickEvent', buttonClickEvent);
events.set('linkClickEvent', linkClickEvent);
events.set('homeEvent', homeEvent);
events.set('infoEvent', infoEvent);
events.set('logoutEvent', logoutEvent);
events.set('confirmModalEvent', confirmModalEvent);
events.set('cancelModalEvent', cancelModalEvent);
