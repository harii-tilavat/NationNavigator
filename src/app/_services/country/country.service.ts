import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CountryModel } from '../../_model';
import { BaseProviderService } from '../base-provider.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseProviderService {
  private fetchUrl = 'https://restcountries.com/v3.1/all';
  private fetchUrlByName = 'https://restcountries.com/v3.1/name';
  constructor(http: HttpClient) {
    super(http);
  }

  getAllCountry(): Observable<Array<CountryModel>> {
    return this.makeGetCall(this.fetchUrl).pipe(map(res => res));
  }
  getCountryByName(name: string): Observable<CountryModel[]> {
    const url = `${this.fetchUrlByName}/${name}`;
    return this.makeGetCall(url).pipe(
      map(res => res),
      catchError(error => {
        console.error(`Error fetching country by name (${name}):`, error);
        return of([]); // Return an empty array in case of error
      })
    );
  }
}
