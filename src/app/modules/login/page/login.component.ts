import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../domain/login';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../core/components/loading/service/loading.service';
import { MessageService } from '../../../core/components/message/service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login;

  loginForm: FormGroup;

  // emailFormControl: FormControl;
  // passwordFormControl: FormControl;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private loadingService: LoadingService,
              private messageService: MessageService) {

    this.login = new Login();
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      dsEmail: ['', [Validators.required, Validators.email]],
      dsPassword: ['', Validators.required]
    });

    // this.emailFormControl = new FormControl('', );
    // this.passwordFormControl = new FormControl('', [Validators.required]);

  }

  doLogin() {

    this.loadingService.start('Autenticando...');

    if (this.loginForm.valid) {
      this.login.username = this.loginForm.get('dsEmail').value;
      this.login.password = this.loginForm.get('dsPassword').value;

      this.loginService.doLogin(this.login)
        .then(() => {
          this.loadingService.done();
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.messageService.show('Usuário ou senha inválidos');
          this.loadingService.done();
        });
    } else {
      this.loadingService.done();
    }

  }

}
