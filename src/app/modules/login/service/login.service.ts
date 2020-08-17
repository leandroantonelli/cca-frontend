import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../domain/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CcaJwt } from '../domain/cca-jwt';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL_API = environment.APICatalog.APILogin;
  jwtPayLoad: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private router: Router) {

    this.loadToken();
  }

  saveCcaJwt(ccaJwt: CcaJwt) {
    this.jwtPayLoad = this.jwtHelper.decodeToken(ccaJwt.access_token);
    localStorage.setItem('cca-jwt', JSON.stringify(ccaJwt));
  }

  loadToken() {
    const ccaJwt: CcaJwt = JSON.parse(localStorage.getItem('cca-jwt'));

    if (ccaJwt) {
      this.saveCcaJwt(ccaJwt);
    }
  }

  getCcaJwt(): CcaJwt {

    const ccaJwt: CcaJwt = JSON.parse(localStorage.getItem('cca-jwt'));

    return ccaJwt;
  }

  hasToken() {
    return !!this.getCcaJwt();
  }

  deleteToken() {
    localStorage.removeItem('cca-jwt');
    this.jwtPayLoad = null;
    this.router.navigate(['/login']);
  }

  doLogin(login: Login) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', environment.TokenBasic);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${login.username}&password=${login.password}&grant_type=password`;
    return this.http.post<CcaJwt>(this.URL_API, body, { headers, withCredentials: true }).toPromise()
      .then(res => {
        this.saveCcaJwt(res);
      })
      .catch(err => {
        if (err.status === 401) {
          if (err.error.error === 'unauthorized') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(err);
      });
  }

  getNewAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', environment.TokenBasic);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';
    return this.http.post<CcaJwt>(this.URL_API, body, { headers, withCredentials: true }).toPromise()
      .then(res => {
        this.saveCcaJwt(res);
        return Promise.resolve(null);
      })
      .catch(err => {
        return Promise.reject(null);
      });
  }

  hasAuthority(permission: string) {
    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permission);
  }

  get isAccessTokenInvalid() {
    const ccaJwt: CcaJwt = JSON.parse(localStorage.getItem('cca-jwt'));
    return !ccaJwt || this.jwtHelper.isTokenExpired(ccaJwt.access_token);
  }
}
