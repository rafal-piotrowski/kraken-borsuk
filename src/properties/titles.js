export const titles = new Map();

// tytuły nagłówkowe dla poszczególnych sekcji i modułów
export const menuNavbarTitle = 'BORSUK - MENU GŁÓWNE';
export const cesubofferNavbarTitle = 'SUBOFERTY OPERACYJNE';

// Opisy na przyciskach i linkach w MenuOption
export const buttonRedirectLabel = 'Przejdź...';
export const linkRedirectLabel = 'LINK';
// Opis na przycisku okna zalogowania
export const buttonLoginLabel = 'Zaloguj';

// Labelki okna dialogowego z infromacją o użytkowniku
export const ckeyLabel = 'Użytkownik: ';
export const lastLoginSuccessLabel = 'Ostatnie logowanie: ';
export const lastLoginFailureLabel = 'Ostatnie niepoprawne logowanie: ';

// Labelki okna logowania
export const headingLoginLabel = "Witamy w aplikacji Borsuk 2";
export const versionLoginLabel = "1.0.1.0";
export const buildLoginLabel = "24.03.2020";

// Komunikaty błędów okna logowania
export const invalidLogin = "wprowadzono niepoprawny CKey";
export const invalidPassword = "wprowadzono niepoprawne hasło";
export const emptyLogin = "wprowadź CKey";
export const emptyPassword = "wprowadź hasło";

// Labelki alertu RWD
export const headRwdAlert = ' Drogi użytkowniku';
export const footRwdAlert = 'Przejdź do strony głównej lub zgłoś problem do administratora sytemu';
export const titleRwdAlert = 'Na chwilę obecną nie możemy obsłużyć tej rozdzielczości ekranu';

// Labelki na formularzasz edycyjnych
export const subofferNameLabel = 'Nazwa suboferty';
export const versionName = 'Nazwa wersji';
export const pushAndSmsPrompt = 'Gdy zdefiniowano PUSH i SMS:';
export const bothChannelsLabel = 'wyślij obydwoma kanałami';
export const preferPushLabel = 'preferuj PUSH';
export const subofferCategoryLabel = 'Kategoria';
export const subofferProductGroupLabel = 'Grupa produktowa';
export const subofferEventLabel = 'Event';
export const pushContentLabel = 'Tu niebawem będzie Rich Text';
export const pushActionGoTo = 'Akcja GO-TO';
export const pushLinkInLabel = 'link wewnętrzny';
export const pushLinkOutLabel = 'link zewnętrzny';
export const sendPeriodLabel = 'Periodyczność wysyłki';
export const sendFromLabel = 'czas wysyłki od:';
export const sendToLabel = 'czas wysyłki do:';
export const smsContentLabel = 'Treść wiadomości SMS';
export const phoneTypeLabel = 'Typ telefonu';
export const messageTitleLabel = 'Tytuł wiadomości';
export const messageGroupLabel = 'Grupa wiadomości';
export const messageExpireTimeLabel = 'Czas ważności';
export const messageContentLabel = 'Tu niebawem będzie Rich Text';
export const messageEventLabel = 'Event powiadomieniowy';

// komunikaty bledow po walidacji pol formularzy
export const errorMessageRequiredName = 'nazwa powinna zawierać przynajmniej 3 znaki i zaczynać się od litery lub cyfry';
export const errorMessageRequiredField = 'wybierz pole z listy';
export const errorMessageRequiredTime = 'wprować wartość od 0 do 23';
export const errorMessageWrongTime = 'nieprawidłowy zakres czasu';
export const errorMessageLinkField = 'tylko jeden link lub akcja może być wybrana';
export const errorMessageEmptyText = 'pole nie może być puste';
 
// szablony walidacji
export const nameAllowedPattern = "[0-9a-zA-Z_]";
export const namePattern = "^[a-zA-Z0-9]+[0-9a-zA-Z_]{2,50}";
export const timeAllowedPattern = "[0-9]";
export const timePattern = "^([0-9]|0[0-9]|1[0-9]|2[0-3]){0,1}$";

titles.set('menuNavbarTitle', menuNavbarTitle);
titles.set('cesubofferNavbarTitle', cesubofferNavbarTitle);
titles.set('ckeyLabel', ckeyLabel);
titles.set('lastLoginSuccessLabel', lastLoginSuccessLabel);
titles.set('lastLoginFailureLabel', lastLoginFailureLabel);
titles.set('buttonRedirectLabel', buttonRedirectLabel);
titles.set('linkRedirectLabel', linkRedirectLabel);
titles.set('buttonLoginLabel', buttonLoginLabel);
titles.set('headingLoginLabel', headingLoginLabel);
titles.set('versionLoginLabel', versionLoginLabel);
titles.set('buildLoginLabel', buildLoginLabel);
titles.set('invalidLogin', invalidLogin);
titles.set('invalidPassword', invalidPassword);
titles.set('emptyLogin', emptyLogin);
titles.set('emptyPassword', emptyPassword);
titles.set('headRwdAlert', headRwdAlert);
titles.set('footRwdAlert', footRwdAlert);
titles.set('titleRwdAlert', titleRwdAlert);
titles.set('subofferNameLabel', subofferNameLabel);
titles.set('versionName', versionName);
titles.set('pushAndSmsPrompt', pushAndSmsPrompt);
titles.set('bothChannelsLabel', bothChannelsLabel);
titles.set('preferPushLabel', preferPushLabel);
titles.set('subofferCategoryLabel', subofferCategoryLabel);
titles.set('subofferProductGroupLabel', subofferProductGroupLabel);
titles.set('subofferEventLabel', subofferEventLabel);
titles.set('pushContentLabel', pushContentLabel);
titles.set('pushActionGoTo', pushActionGoTo);
titles.set('pushLinkInLabel', pushLinkInLabel);
titles.set('pushLinkOutLabel', pushLinkOutLabel);
titles.set('sendPeriodLabel', sendPeriodLabel);
titles.set('sendFromLabel', sendFromLabel);
titles.set('sendToLabel', sendToLabel);
titles.set('smsContentLabel', smsContentLabel);
titles.set('phoneTypeLabel', phoneTypeLabel);
titles.set('messageGroupLabel', messageGroupLabel);
titles.set('messageExpireTimeLabel', messageExpireTimeLabel);
titles.set('messageContentLabel', messageContentLabel);
titles.set('messageEventLabel', messageEventLabel);
titles.set('messageTitleLabel', messageTitleLabel);
titles.set('errorMessageRequiredName', errorMessageRequiredName);
titles.set('errorMessageRequiredField', errorMessageRequiredField);
titles.set('errorMessageRequiredTime', errorMessageRequiredTime);
titles.set('errorMessageWrongTime', errorMessageWrongTime);
titles.set('nameAllowedPattern', nameAllowedPattern);
titles.set('namePattern', namePattern);
titles.set('timeAllowedPattern', timeAllowedPattern);
titles.set('timePattern', timePattern);
titles.set('errorMessageLinkField', errorMessageLinkField);
titles.set('errorMessageEmptyText', errorMessageEmptyText);
