import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
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

  findAll() {

    return this.http.get(this.URL_API) as Observable<Perfil[]>;

  }

  findById(idPerfil: number) {
    return this.http.get(`${this.URL_API}/${idPerfil}`) as Observable<Perfil>;
  }

  findAllMenus() {

    return this.http.get(`${this.URL_API}/menus`) as Observable<MenuDTO[]>;

  }
}
