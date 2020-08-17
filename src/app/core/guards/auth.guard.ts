import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../modules/login/service/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateToken();
  }

  validateToken() {
    if (this.loginService.isAccessTokenInvalid) {
      return this.loginService.getNewAccessToken()
        .then(() => {
          if (this.loginService.isAccessTokenInvalid) {
            this.router.navigate(['/login']);
            return Promise.resolve(false);
          }
          return Promise.resolve(true);
        })
        .catch(() => {
          this.router.navigate(['/login']);
          return Promise.resolve(false);
        });
    } else {
      return Promise.resolve(true);
    }
  }
}
