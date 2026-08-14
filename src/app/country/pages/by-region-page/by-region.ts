import { Component, inject, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { NgClass } from '@angular/common';
import { CountryService } from '../../services/countryService';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-region',
  imports: [CountryList, NgClass],
  templateUrl: './by-region.html',

})
export class ByRegion {
  regions = [
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Antarctic'
];
  selectedRegion = signal<string>('Americas');
  countryService = inject(CountryService);


   countryResource = rxResource({
      params: () =>  ({code: this.selectedRegion()}),
      stream: ({params}) =>{
        return this.countryService.searchByRegion(params.code);
  
      }
    })

}
