import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../login/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers: [NgbDropdownConfig]
})
export class TopComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;

  constructor(config: NgbDropdownConfig,
              private router: Router,
              private loginService: LoginService) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
  }

  // toggle sidebar
  toggleSidebar() {
    const body = document.querySelector('body');
    if ((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if (this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if (this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  logout() {
    this.loginService.deleteToken();
  }

  showPerfil() {

    this.router.navigate(['/user/perfil']);
  }

  getUsername() {

    return this.loginService.getCcaJwt().user.dsName;

  }
}
