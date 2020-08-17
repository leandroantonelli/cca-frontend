import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';
import { CcaJwt } from '../login/domain/cca-jwt';
import { MenuDTO } from '../menu/domain/menu-dto';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  menuList: MenuDTO[] = [];

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
    const ccaJwt: CcaJwt = this.loginService.getCcaJwt();
    this.menuList = ccaJwt.user.perfil.menus;
  }

  logout(): void {
    this.loginService.deleteToken();
    this.router.navigate(['/login']);
  }

  showPerfil() {
    this.router.navigate(['/user/perfil']);
  }

  getUsername() {
    return this.loginService.getCcaJwt().user.dsName;1
  }

}
