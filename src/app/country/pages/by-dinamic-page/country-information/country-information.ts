import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
  
})
export class CountryInformation {
  country = input.required<Country>()


   currentYear = computed(() => {
    return new Date().getFullYear();
  });
}
