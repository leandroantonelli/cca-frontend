import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../domain/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL_API = environment.APICatalog.APIUser;

  constructor(private http: HttpClient) {

  }

  findAll(): Observable<User[]> {

    return this.http.get<User[]>(this.URL_API) as Observable<User[]>;

  }

  findById(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.URL_API}/${idUser}`) as Observable<User>;
  }
}
