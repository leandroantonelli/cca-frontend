import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../domain/user';
import { UserService } from './user.service';

@Injectable()
export class UserFormResolver implements Resolve<User> {

  constructor(private userService: UserService) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.findById(route.params.id);
  }
}
