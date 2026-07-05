import { Routes } from '@angular/router';
import { HomePages } from './shared/pages/home-pages/home-pages';

export const routes: Routes = [

    {
        path: '',
        component: HomePages
    },
    {
        path: 'country',
        loadChildren: () => import('./country/country.routes')
    },
    {
        path: '**',
        redirectTo: ''

    }
];
