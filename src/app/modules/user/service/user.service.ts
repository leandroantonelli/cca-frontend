import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../domain/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../../perfil/domain/perfil';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL_API = environment.APICatalog.APIUser;

  constructor(private http: HttpClient) {

  }

  findAll(): Observable<User[]> {

    return this.http.get<User[]>(`${this.URL_API}/all`) as Observable<User[]>;

  }

  findById(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.URL_API}/findById/${idUser}`) as Observable<User>;
  }

  save(user: User): Observable<User> {
    return this.http.post(this.URL_API, user) as Observable<User>;
  }

  delete(idUser): Observable<any> {
    return this.http.delete(`${this.URL_API}/${idUser}`);
  }
}
