import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/countryService';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput,CountryList],
  templateUrl: './by-country.html',
})
export class ByCountry {

  countryService = inject(CountryService)
  query = signal('');

  countryResource = resource({
    params: () => ({query: this.query()}),
    loader: async({params}) =>{
      if (!params.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      );
    }
  });

   onSearch(value:string){
    console.log({value});
    
  }
}
