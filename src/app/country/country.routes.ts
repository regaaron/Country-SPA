import { Routes } from "@angular/router";
import { ByCapitalPage } from "./pages/by-capital-page/by-capital-page";
import { CountryLayout } from "./layout/country-layout/country-layout";
import { ByCountry } from "./pages/by-country-page/by-country";
import { ByRegion } from "./pages/by-region-page/by-region";
import { ByDinamicPage } from "./pages/by-dinamic-page/by-dinamic-page";




export const countryRoutes: Routes = [
    {
        path: '',
        component: CountryLayout,
        children: [
        {
            path: 'by-capital',
            component: ByCapitalPage
        },
        {
            path: 'by-country',
            component: ByCountry
        },
        {
            path: 'by-region',
            component: ByRegion
        },
        {
            path: 'by/:slug',
            component: ByDinamicPage
        },
        {
            path: '**',
            redirectTo: 'by-capital'
        }
        ]
    }
]

export default countryRoutes;