import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/countryService';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country.html',
})
export class ByCountry {

  countryService = inject(CountryService)

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';


  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      const query = params.query.trim();
      if (!query) {
        return of([]);
      }

      
        this.router.navigate(['/country/by-country'],{
          queryParams: {
            query: query,
          }
        })


      return this.countryService.searchByCountry(params.query);
    }
  });

  // countryResource = resource({
  //   params: () => ({query: this.query()}),
  //   loader: async({params}) =>{
  //     if (!params.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     );
  //   }
  // });


}
