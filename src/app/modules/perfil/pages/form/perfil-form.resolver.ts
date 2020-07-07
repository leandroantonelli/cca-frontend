import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Perfil } from '../../domain/perfil';
import { PerfilService } from '../../service/perfil.service';

@Injectable()
export class PerfilFormResolver implements Resolve<Perfil> {

  constructor(private perfilService: PerfilService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Perfil> {
    return this.perfilService.findById(route.params.id);
  }

}
