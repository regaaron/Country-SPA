import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Country } from '../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe,RouterLink],
  templateUrl: './country-list.html',
})
export class CountryList {
  countries = input<Country[] | null>(null)

  errorMessage = input<string|null|unknown>()
  isLoading = input<boolean>()
  isEmpty = input<boolean>()

}
