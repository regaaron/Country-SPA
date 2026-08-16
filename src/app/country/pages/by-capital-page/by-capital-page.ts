import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInput } from "../../../shared/components/search-input/search-input";
import { CountryLayout } from "../../layout/country-layout/country-layout";
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/countryService';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../../mappers/country.maaper';
import { Country } from '../../interfaces/country.interfaces';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService)
  
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  
  query = linkedSignal(() => this.queryParam);
  
   countryResource = rxResource({
  params: () => ({query: this.query()}),
  stream: ({params}) =>{
     const query = params.query.trim();

        if ( !query ) {
            return of([]);   
        }

        this.router.navigate(['/country/by-capital'],{
          queryParams: {
            query: query,
          }
        })


    return this.countryService.searchByCapital(params.query);
  }
});

}