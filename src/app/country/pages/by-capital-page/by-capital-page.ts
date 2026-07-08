import { Component, inject } from '@angular/core';
import { SearchInput } from "../../../shared/components/search-input/search-input";
import { CountryLayout } from "../../layout/country-layout/country-layout";
import { CountryList } from '../../components/country-list/country-list';
import { Country } from '../../services/country';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(Country)
 onSearch(value:string){
    console.log({value});
    this.countryService.searchByCapital(value).subscribe(resp => {
      console.log({resp});
      
    })
    
  }
}