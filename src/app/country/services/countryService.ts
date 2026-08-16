import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environments';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.maaper';
import { Country } from '../interfaces/country.interfaces';
const API_URL = 'https://api.restcountries.com/countries/v5';

@Service()
export class CountryService {
    private http = inject(HttpClient)
    private queryCacheCapital = new Map<string, Country[]>()
    private queryCacheCountry = new Map<string, Country[]>()
    private queryCacheRegion = new Map<string, Country[]>()

    searchByCapital(query:string) : Observable<Country[]>{

        console.log(`emitiendo valor de ${query}`);
        console.log(environment.apiKey);
        

        if(this.queryCacheCapital.has(query)){
            return of(this.queryCacheCapital.get(query)!)
        }
        
        // query = query.toLowerCase();
        return this.http.get<RESTCountry>(`${API_URL}/capitals?q=${query}&pretty=1`,
            {
                headers: {Authorization: `Bearer ${environment.apiKey}`}
            }
        )
        .pipe(
            map( restCountries => CountryMapper.mapResponseToCountryArray(restCountries)),
            tap(countries => this.queryCacheCapital.set(query, countries)),
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

    searchByCountry(query:string) : Observable<Country[]>{

        const url = `${API_URL}/name?q=${query}&pretty=1`;

        if(this.queryCacheCountry.has(query)){
            return of(this.queryCacheCountry.get(query)!)
        }

        return this.http.get<RESTCountry>(url,
            {
                headers: {Authorization: `Bearer ${environment.apiKey}`}
            }
        )
        .pipe(
            map( restCountries => CountryMapper.mapResponseToCountryArray(restCountries)),
            tap(countries => this.queryCacheCountry.set(query, countries)),
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


    searchByAlphaCode(code:string) : Observable<Country | undefined>{

        const url = `${API_URL}/codes.alpha_2/${code}?pretty=1`;

        return this.http.get<RESTCountry>(url,
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
            map( countries => countries.at(0)),
            catchError((error) => {
                console.log('Error fetching' ,error);

                return throwError(
                    () => new Error(`No se pudo obtener paises  con ese query ${code}`)
                )
                
            })
        );
    }

    searchByRegion(region:string) : Observable<Country[]>{

        const url = `${API_URL}/region/${region}`;

        if(this.queryCacheRegion.has(region)){
            return of(this.queryCacheRegion.get(region)!)
        }

        return this.http.get<RESTCountry>(url,
            {
                headers: {Authorization: `Bearer ${environment.apiKey}`}
            }
        )
        .pipe(
            map( restCountries => CountryMapper.mapResponseToCountryArray(restCountries)),
            tap(countries => this.queryCacheRegion.set(region, countries)),
            map( countries =>{
                if(countries.length === 0){
                    throw new Error('No se encontro ningun pais')
                }
                return countries
            }),
            catchError((error) => {
                console.log('Error fetching' ,error);

                return throwError(
                    () => new Error(`No se pudo obtener paises  con ese query ${region}`)
                )
                
            })
        );
    }

}
