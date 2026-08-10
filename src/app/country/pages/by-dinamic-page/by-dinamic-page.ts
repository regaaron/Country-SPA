import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/countryService';

@Component({
  selector: 'app-by-dinamic-page',
  imports: [],
  templateUrl: './by-dinamic-page.html',
})
export class ByDinamicPage {

  countryCode = inject(ActivatedRoute).snapshot.params['code']
  countryService = inject(CountryService)

  countryResource = rxResource({
    params: () =>  ({code: this.countryCode}),
    stream: ({params}) =>{
      return this.countryService.searchByAlphaCode(params.code);

    }
  })

}
