import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../../shared/components/search-input/search-input";
import { CountryLayout } from "../../layout/country-layout/country-layout";
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/countryService';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../../mappers/country.maaper';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService)
  isloading = signal(false)
  isError = signal<string|null>(null)
countries = signal<Country[] | null>(null);

 onSearch(value:string){
    if(this.isloading()) return;


    this.isloading.set(true)
    this.isError.set(null)
    this.countryService.searchByCapital(value)
    .subscribe(resp => {
      this.isloading.set(false)
      this.countries.set(resp)
      console.log({resp});
      
    })
    
  }
}