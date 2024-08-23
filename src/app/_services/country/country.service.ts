import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CountryModel } from '../../_model';
import { BaseProviderService } from '../base-provider.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseProviderService {
  private fetchUrl = 'https://restcountries.com/v3.1/all';
  constructor(http: HttpClient) {
    super(http);
  }

  getAllCountry(): Observable<Array<CountryModel>> {
    return this.makeGetCall(this.fetchUrl).pipe(map(res => res));
  }
}
