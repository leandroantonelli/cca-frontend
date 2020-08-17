import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Correios } from '../domain/correios';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  private readonly URL_API = environment.APICatalog.APICorreios;

  constructor(private http: HttpClient) {

  }

  findByCep(dsCep: string): Observable<Correios> {

    return this.http.get(`${this.URL_API}/${dsCep}`) as Observable<Correios>;
  }

}
