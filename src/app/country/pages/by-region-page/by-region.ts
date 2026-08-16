import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { NgClass } from '@angular/common';
import { CountryService } from '../../services/countryService';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

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

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region');

  selectedRegion = linkedSignal<string>(() => this.queryParam ?? 'Americas');




  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {

       this.router.navigate(['/country/by-region'],{
          queryParams: {
            region: params.region,
          }
        })


      return this.countryService.searchByRegion(params.region);

    }
  })

}
