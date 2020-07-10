import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/page/login.component';
import { TemplateComponent } from './modules/template/template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './core/components/loading/service/loading.service';
import { LoginService } from './login/service/login.service';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatRadioModule, MatSelectModule, MatSidenavModule,
  MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatTableModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { MessageService } from './core/components/message/service/message.service';
import { LoadingComponent } from './core/components/loading/loading.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/guards/auth.guard';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TopComponent } from './modules/top/top.component';
import { FooterComponent } from './modules/footer/footer.component';
import { MenuComponent } from './modules/menu/pages/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './modules/user/service/user.service';
import { UserFormComponent } from './modules/user/pages/form/user-form.component';
import { CcaJwt } from './login/domain/cca-jwt';
import { AuthInterceptor } from './core/http/auth.interceptor';
import { PerfilListComponent } from './modules/perfil/pages/list/perfil-list.component';
import { UserListComponent } from './modules/user/pages/list/user-list.component';
import { PerfilFormComponent } from './modules/perfil/pages/form/perfil-form.component';
import { PerfilService } from './modules/perfil/service/perfil.service';
import { PerfilFormResolver } from './modules/perfil/pages/form/perfil-form.resolver';
import { UserFormResolver } from './modules/user/pages/form/user-form.resolver';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { NgxMaskModule } from 'ngx-mask';
import { TopGridListComponent } from './core/components/top-grid-list/top-grid-list.component';
import { ButtonsActionsFormComponent } from './core/components/buttons-actions-form/buttons-actions-form.component';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TemplateComponent,
    LoadingComponent,
    TopComponent,
    TopGridListComponent,
    ButtonsActionsFormComponent,
    FooterComponent,
    MenuComponent,
    DashboardComponent,
    PerfilListComponent,
    PerfilFormComponent,
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
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
    MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    LoadingService,
    LoginService,
    MessageService,
    PerfilService,
    PerfilFormResolver,
    UserService,
    UserFormResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
