/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import { LitElement, html, css } from 'lit-element';
import { BorsukContentStyle } from './BorsukContentStyle.js';

export class BorsukContent extends LitElement {
    static get styles() {
        return [BorsukContentStyle];
    }

    render() {
        return html`
            <div id="contentTabsForm">
                <div class="centerFace centerFrame">
                    <h2><strong>Witamy w nowej odsłonie aplikacji Borsuk.</strong></h2>
                </div>

                <blockquote class="textareaParallax">
                    <p>Oddajemy Wam do użytku moduł zarządzania komunikacją operacyjną.</p>
                    <p>Moduł jest w fazie rozwojowej dlatego prosimy o każdą infromację zwrotną dotyczącą jego funkcjonalności.</p>
                    <p>Chcemy, żeby cała aplikacja tworzona była zgodnie z zasadą User Centered Design, a więc zgodnie z powiedzeniem: </p><br>
                    <p><cite>Interfejs użytkownika jest jak dobry żart. Jeśli musisz go tłumaczyć - nie jest taki dobry.</cite></p>
                    <br>
                    <p>Mając na uwadze doświaczenie użytkownika z pierwszą wesją aplikacji staraliśmy się zbudować interfejs który agreguje istoną treść w jednym miejscu,
                    minimalizując ilość przejść pomiędzy różnymi częściami aplikacji podczas realizacji podstawowych czynności</p>
                    <p>Spójny interfejs to również taki który charakteryzuje się krótkim czasem niezbędnym na jego poznanie.</p>
                    <p>Oznacza to, że użytkownik poznając jedynie fragment systemu pozostałe jego części zrozumie w oparciu o dotychczasowe doświadczenie.</p>
                </blockquote>

                <!-- <watsonlogic-parallax parallax-image-height="400" parallax-text="" parallax-image="{{imgsrcfeature1}}">
                </watsonlogic-parallax> -->

                <blockquote class="textareaParallax">
                    <div class="centerFrame">
                        <p>Nowa wersja aplikacji jest realizowana zgodnie z podejściem SPA.</p>
                        <p>Single Page Application bo o tym mowa to w skrócie podejście do tworzenia aplikacji webowych polegające na jednorazowym załadowaniu całego wyglądu strony.</p>
                        <p>Aplikacja działa dużo szybciej, ponieważ widok aplikacji jest tworzony wyłącznie raz, a poszczególne elementy są podmieniane wyłącznie, gdy jest to konieczne.</p>
                        <p>Podejście takie to mniejsze obciążenie dla serwera, dzięki temu ze wykonujemy część operacji po stronie klienta.</p>
                        <p>Do budowy aplikacji wykorzystaliśmy framework Vaadin. Jest to framework umożliwiającym tworzenie aplikacji webowych w języku Java.</p>
                        <p>Pomimo tego, że Vaadin jest plaformą, która pozwala stworzyć interfejs użytkownika w całości w Javie to przy towrzeniu Borsuka zdecydowaliśmy się oddzielić część frontową od całości.</p>
                        <p>Vaadin działający po stronie serwera automatycznie i z zachowaniem wymogów bezpieczeństwa obsługuje całą komunikację</p>
                        <p>Opierając się na ekosystemie Java płynnie współpracuje z komponentami frontowymi.</p>
                    </div>
                </blockquote>

                <!-- <watsonlogic-parallax parallax-image-height="400" parallax-text="" parallax-image="{{imgsrcfeature2}}">
                </watsonlogic-parallax> -->

                <blockquote class="textareaParallax">
                    <div class="centerFrame">
                        <p>Część frontowa aplikacji została zbudowana z użyciem komponentów webowych.</p>
                        <p>Web Components o których mowa to koncepcja re-używalnych kawałków kodu (komponentów), które zawierają szablon widoku HTML i które mogą być następnie zaimportowane w innych komponentach.</p>
                        <p>Po zaimportowaniu web komponentu można używać go w kodzie tak, jakby był on zwykłym tagiem HTML.</p>
                        <p>Tworzenie tychże komponentów możliwe jest dzięki bibliotece Polymer.</p>
                        <p>Polymer to biblioteka dostarczająca dodatkowy zestaw narzędzi oraz deklaratywną składnię, która pomaga w definiowaniu struktury elementów, nadawaniu im styli CSS oraz dodawaniu zachowań tworzonych w języku JavaScript</p>
                    </div>
                </blockquote>

                <!-- <watsonlogic-parallax parallax-image-height="400" parallax-image="{{imgsrcfeature3}}">
                </watsonlogic-parallax> -->

                <blockquote class="textareaParallax">
                    <div class="centerFrame">
                        <p>Przed nami jeszcze dużo pracy.</p>
                        <p>W najbliższych planach jest udostępnienie modułu do zarządzania ofertami marketingowymi.</p>
                        <p>W dalszym etapie - moduł zarządzania procesem.</p>

                        <p>Poszczególne etapy rozwoju Borsuka będziemy opisywać w części informacyjnej aplikacji oraz w ...</p>
                        <div class="row">
                            <div class="col-4"></div>
                            <div class="onboarding col-4">
                                <a href="http://sdpl04365.pl.ing-ad:8080/" target="#">
                                    <paper-button class="btn btn-warning btn-block">...dokumentacji</paper-button>
                                </a>
                            </div>
                            <div class="col-4"></div>
                        </div>
                    </div>

                    <footer>— Zespół Borsuk</footer>
                </blockquote>
            </div>
        `;
    }

    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    firstUpdated() {
    }

}
