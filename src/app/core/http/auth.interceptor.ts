import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CcaJwt } from '../../modules/login/domain/cca-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.indexOf('/oauth/token') === -1 && localStorage.getItem('cca-jwt') != null) {

      const ccaJwt: CcaJwt = JSON.parse(localStorage.getItem('cca-jwt'));

      request = request.clone({
        setHeaders: {
          Authorization: ccaJwt.token_type + ` ` + ccaJwt.access_token
        }
      });
    }

    return next.handle(request);
  }
}
