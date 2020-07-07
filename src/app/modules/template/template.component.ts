import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/service/login.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  showSidebar = true;
  showNavbar = true;
  showFooter = false;
  isLoading: boolean;

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.loginService.deleteToken();
    this.router.navigate(['login']);
  }

  isAdmin() {
    //return this.authenticationService.hasAuthority(ROLES.ADMIN);
  }

}
