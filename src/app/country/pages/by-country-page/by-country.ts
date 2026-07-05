import { Component } from '@angular/core';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput,CountryList],
  templateUrl: './by-country.html',
})
export class ByCountry {
   onSearch(value:string){
    console.log({value});
    
  }
}
