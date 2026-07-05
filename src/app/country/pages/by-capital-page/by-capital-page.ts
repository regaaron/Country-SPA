import { Component } from '@angular/core';
import { SearchInput } from "../../../shared/components/search-input/search-input";
import { CountryLayout } from "../../layout/country-layout/country-layout";
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
 onSearch(value:string){
    console.log({value});
    
  }
}