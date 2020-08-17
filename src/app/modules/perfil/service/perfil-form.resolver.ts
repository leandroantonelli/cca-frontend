import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../domain/perfil';
import { PerfilService } from './perfil.service';

@Injectable()
export class PerfilFormResolver implements Resolve<Perfil> {

  constructor(private perfilService: PerfilService) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Perfil> {
    return this.perfilService.findById(route.params.id);
  }
}
