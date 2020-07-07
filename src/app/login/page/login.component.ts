import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../core/components/loading/service/loading.service';
import { Login } from '../domain/login';
import { LoginService } from '../service/login.service';
import { MessageService } from '../../core/components/message/service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorLogin = false;
  msgErrorLogin = '';
  login: Login;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private loadingService: LoadingService) {

    this.login = new Login();
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin() {

    this.loadingService.start('Autenticando...');

    if (this.loginForm.valid) {
      this.login.username = this.loginForm.get('login').value;
      this.login.password = this.loginForm.get('password').value;

      this.loginService.doLogin(this.login)
        .then(() => {
          this.loadingService.done();
          this.router.navigate(['/dashboard']);
        })
        .catch(err => {
          this.msgErrorLogin = 'Usuário ou senha inválidos';
          this.errorLogin = true;
          this.loadingService.done();
        });
    } else {
      this.msgErrorLogin = 'Teste';
      this.errorLogin = true;
      this.loadingService.done();
    }

  }

}
