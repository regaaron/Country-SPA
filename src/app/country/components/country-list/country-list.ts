import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-country-list',
  imports: [],
  templateUrl: './country-list.html',
})
export class CountryList {
  countries = input<Country[] | null>(null)
}
