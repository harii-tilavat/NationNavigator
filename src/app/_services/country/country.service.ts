import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CountryModel } from '../../_model';
import { BaseProviderService } from '../base-provider.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseProviderService {
  private fetchUrl = environment.apiUrl;
  constructor(http: HttpClient) {
    super(http);
  }

  getAllCountry(): Observable<Array<CountryModel>> {
    return this.makeGetCall(this.fetchUrl + '/all').pipe(map(res => res));
  }
  getCountryByName(name: string): Observable<CountryModel[]> {
    const url = `${this.fetchUrl}/name/${name}`;
    return this.makeGetCall(url).pipe(
      map(res => res),
      catchError(error => {
        console.log(`Error fetching country by name (${name}):`, error);
        return of([]); // Return an empty array in case of error
      })
    );
  }
  getCountryDetailsByCode(code: string): Observable<Array<CountryModel>> {
    return this.makeGetCall(`${this.fetchUrl}/alpha/${code}`).pipe(map(res => res));
  }
}
