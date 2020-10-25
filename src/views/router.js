/* eslint-disable import/no-extraneous-dependencies */
import { Router } from '@vaadin/router';
import './login/borsuk-login-app.js';

const routes = [
    {
        path: '/',
        component: 'borsuk-login-app',
    },
    {
        path: 'menu',
        component: 'borsuk-menu-app',
        action: async () => {
          await import('./startmenu/borsuk-menu-app.js');
        },
    },
    {
        path: 'cesuboffer',
        component: 'borsuk-cesuboffer-app',
        action: async () => {
          await import('./cesuboffer/borsuk-cesuboffer-app.js');
        },
    },
    {
        path: 'campform',
        component: 'borsuk-campform-app',
        action: async () => {
          await import('./campform/borsuk-campform-app.js');
        },
    },
];

const outlet = document.getElementById('outlet');
export const router = new Router(outlet);
router.setRoutes(routes);
