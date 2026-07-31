import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environments';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.maaper';
import { Country } from '../interfaces/country.interfaces';
const API_URL = 'https://api.restcountries.com/countries/v5';

@Service()
export class CountryService {
    private http = inject(HttpClient)

    searchByCapital(query:string) : Observable<Country[]>{
        // query = query.toLowerCase();
        return this.http.get<RESTCountry>(`${API_URL}/capitals?q=${query}&pretty=1`,
            {
                headers: {Authorization: `Bearer ${environment.apiKey}`}
            }
        )
        .pipe(
            map( restCountries => CountryMapper.mapResponseToCountryArray(restCountries)),
            map( countries =>{
                if(countries.length === 0){
                    throw new Error('No se encontro ningun pais')
                }
                return countries
            }),
            catchError((error) => {
                console.log('Error fetching' ,error);

                return throwError(
                    () => new Error(`No se pudo obtener paises  con ese query ${query}`)
                )
                
            })
        );
    }
}
