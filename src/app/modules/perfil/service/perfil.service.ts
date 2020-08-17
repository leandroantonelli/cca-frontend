import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../domain/perfil';
import { MenuDTO } from '../../menu/domain/menu-dto';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private readonly URL_API = environment.APICatalog.APIPerfil;

  constructor(private http: HttpClient) {

  }

  findAll(): Observable<Perfil[]> {

    return this.http.get<Perfil[]>(`${this.URL_API}/all`) as Observable<Perfil[]>;

  }

  findAllMenus(): Observable<MenuDTO[]> {

    return this.http.get(`${this.URL_API}/menu/all`) as Observable<MenuDTO[]>;
  }

  findById(idPerfil: number): Observable<Perfil> {

    return this.http.get(`${this.URL_API}/findById/${idPerfil}`) as Observable<Perfil>;
  }

  save(perfil: Perfil): Observable<Perfil> {

    return this.http.post(this.URL_API, perfil) as Observable<Perfil>;

  }

  delete(idPerfil): Observable<any> {
    return this.http.delete(`${this.URL_API}/${idPerfil}`);
  }

}
