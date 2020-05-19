import { actions } from './actions.js';
import { events } from './events.js';

export const actions2events = new Map();

actions2events.set(actions.get('closeTabAction'),           events.get('closeTabEvent'));
actions2events.set(actions.get('changeTabAction'),          events.get('changeTabEvent'));
actions2events.set(actions.get('buttonClickAction'),        events.get('buttonClickEvent'));
actions2events.set(actions.get('linkClickAction'),          events.get('linkClickEvent'));
actions2events.set(actions.get('homeAction'),               events.get('homeEvent'));
actions2events.set(actions.get('infoAction'),               events.get('infoEvent'));
actions2events.set(actions.get('logoutAction'),             events.get('logoutEvent'));
actions2events.set(actions.get('addSubofferAction'),        events.get('addSubofferEvent'));
actions2events.set(actions.get('editSubofferAction'),       events.get('editSubofferEvent'));
actions2events.set(actions.get('filterOpenAction'),         events.get('filterOpenEvent'));
actions2events.set(actions.get('filterConfirmAction'),      events.get('filterConfirmEvent'));
actions2events.set(actions.get('filterSelectResultAction'), events.get('filterSelectResultEvent'));
