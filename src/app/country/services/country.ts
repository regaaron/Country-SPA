import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environments';
const API_URL = 'https://api.restcountries.com/countries/v5';

@Service()
export class Country {
    private http = inject(HttpClient)

    searchByCapital(query:string){
        // query = query.toLowerCase();
        return this.http.get(`${API_URL}/capitals?q=${query}&pretty=1`,
            {
                headers: {Authorization: `Bearer ${environment.apiKey}`}
            }
        );
    }
}
