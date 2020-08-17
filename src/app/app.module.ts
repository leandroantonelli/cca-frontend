import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './modules/login/service/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/http/auth.interceptor';
import { LoadingService } from './core/components/loading/service/loading.service';
import { LoadingComponent } from './core/components/loading/loading.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './modules/login/page/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TemplateComponent } from './modules/template/template.component';
import { MessageService } from './core/components/message/service/message.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CcaJwt } from './modules/login/domain/cca-jwt';
import { environment } from '../environments/environment';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './modules/dashboard/page/dashboard.component';
import { PerfilListComponent } from './modules/perfil/pages/list/perfil-list.component';
import { PerfilFormComponent } from './modules/perfil/pages/form/perfil-form.component';
import { UserListComponent } from './modules/user/pages/list/user-list.component';
import { UserFormComponent } from './modules/user/pages/form/user-form.component';
import { UserService } from './modules/user/service/user.service';
import { PerfilService } from './modules/perfil/service/perfil.service';
import { ButtonsActionsFormComponent } from './core/components/buttons-actions-form/buttons-actions-form.component';
import { FormErrorsComponent } from './core/components/form-errors/form-errors.component';
import { DialogConfirmService } from './core/components/dialog/confirm/service/dialog-confirm.service';
import { DialogConfirmComponent } from './core/components/dialog/confirm/dialog-confirm.component';
import { PerfilFormResolver } from './modules/perfil/service/perfil-form.resolver';
import { ErrorFormService } from './core/components/form/service/error-form.service';
import { AbstractFormComponent } from './core/components/form/abstract-form.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatSelectFilterModule } from 'mat-select-filter';
import { CorreiosService } from './modules/correios/service/correios.service';
import { UserFormResolver } from './modules/user/service/user-form.resolver';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      const ccaJwt: CcaJwt = JSON.parse(localStorage.getItem('cca-jwt'));
      return ccaJwt.access_token;
    },
    whitelistedDomains: environment.TokenWhitelistedDomains,
    blacklistedRoutes: environment.TokenBlacklistedRoutes
  };
}

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    LoadingComponent,
    LoginComponent,
    AbstractFormComponent,
    ButtonsActionsFormComponent,
    DialogConfirmComponent,
    FormErrorsComponent,
    DashboardComponent,
    PerfilListComponent,
    PerfilFormComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
    NgxMaskModule.forRoot(maskConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSelectFilterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    MessageService,
    LoadingService,
    ErrorFormService,
    DialogConfirmService,
    LoginService,
    PerfilService,
    PerfilFormResolver,
    UserService,
    UserFormResolver,
    CorreiosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
