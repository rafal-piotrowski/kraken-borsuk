export const events = new Map();

// event zamkniecia taba
export const closeTabEvent = 'evCloseTab';
// event zmiany taba
export const changeTabEvent = 'evChangeTab';
// event przejscia z opcji menu do wybranego modułu
export const buttonClickEvent = 'evButtonRedirect';
// event przejscia z notyfikacji menu do danej sekcji w module
export const linkClickEvent = 'evLinkRedirect';
// event przejścia do menu głównego aplikacji
export const homeEvent = 'evHome';
// event otwierająca modal z informacją o użytkowniku
export const infoEvent = 'evUserinfo';
// event wylogowania z systemu
export const logoutEvent = 'evLogout';

// eventy dotyczące filtra zaawansowanego
export const filterOpenEvent = 'evFilterOpen';
export const filterConfirmEvent = 'evFilterConfirm';
export const filterSelectResultEvent = 'evFilterSelectResult';
export const filterResetEvent = 'evFilterReset';

// eventy wywoływane przey zamknieciu modala
export const confirmModalEvent = 'evConfirmModal';
export const cancelModalEvent = 'evCancelModal';

// eventy cyklu tworzenia subofert i wersji
export const addSubofferEvent = 'evAddSuboffer';
export const editSubofferEvent = 'evEditSuboffer';
export const editVersionEvent = 'evEditVersion';
export const saveSubofferEvent = 'evSaveSuboffer';
export const removeSubofferEvent = 'evRemoveSuboffer';
export const copySubofferEvent = 'evCopySuboffer';
export const addVersionEvent = 'evAddVersion';
export const publishTestEvent = 'evPublishTest';
export const publishProdEvent = 'evPublishProd';
export const saveVersionEvent = 'evSaveVersion';
export const removeVersionEvent = 'evRemoveVersion';
export const copyVersionEvent = 'evCopyVersion';
export const approveVersionEvent = 'evApproveVersion';

// eventy cyklu towrzenia formatek akcji
export const saveCampEvent = 'evSaveCampaign';

// eventy schedulera
export const addScheduleEvent = 'evAddScheduleVersion';
export const editScheduleEvent = 'evEditScheduleVersion';
export const removeScheduleEvent = 'evRemoveScheduleVersion';

events.set('closeTabEvent', closeTabEvent);
events.set('changeTabEvent', changeTabEvent);
events.set('buttonClickEvent', buttonClickEvent);
events.set('linkClickEvent', linkClickEvent);
events.set('homeEvent', homeEvent);
events.set('infoEvent', infoEvent);
events.set('logoutEvent', logoutEvent);
events.set('confirmModalEvent', confirmModalEvent);
events.set('cancelModalEvent', cancelModalEvent);
events.set('addSubofferEvent', addSubofferEvent);
events.set('editSubofferEvent', editSubofferEvent);
events.set('editVersionEvent', editVersionEvent);
events.set('saveSubofferEvent', saveSubofferEvent);
events.set('removeSubofferEvent', removeSubofferEvent);
events.set('copySubofferEvent', copySubofferEvent);
events.set('addVersionEvent', addVersionEvent);
events.set('publishTestEvent', publishTestEvent);
events.set('publishProdEvent', publishProdEvent);
events.set('saveVersionEvent', saveVersionEvent);
events.set('removeVersionEvent', removeVersionEvent);
events.set('copyVersionEvent', copyVersionEvent);
events.set('approveVersionEvent', approveVersionEvent);
events.set('filterOpenEvent', filterOpenEvent);
events.set('filterConfirmEvent', filterConfirmEvent);
events.set('filterSelectResultEvent', filterSelectResultEvent);
events.set('filterResetEvent', filterResetEvent);
events.set('addScheduleEvent', addScheduleEvent);
events.set('editScheduleEvent', editScheduleEvent);
events.set('removeScheduleEvent', removeScheduleEvent);
