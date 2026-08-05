import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/countryService';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput,CountryList],
  templateUrl: './by-country.html',
})
export class ByCountry {

  countryService = inject(CountryService)
  query = signal('');

  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) =>{
      const query = params.query.trim();
      if ( !query ) {
          return of([]);   
      }
      return this.countryService.searchByCountry(params.query);
    }
  });

  // countryResource = resource({
  //   params: () => ({query: this.query()}),
  //   loader: async({params}) =>{
  //     if (!params.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     );
  //   }
  // });

   
}
