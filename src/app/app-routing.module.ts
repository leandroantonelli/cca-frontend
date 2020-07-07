import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/page/login.component';
import { TemplateComponent } from './modules/template/template.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserFormComponent } from './modules/user/pages/form/user-form.component';
import { PerfilListComponent } from './modules/perfil/pages/list/perfil-list.component';
import { PerfilFormComponent } from './modules/perfil/pages/form/perfil-form.component';
import { PerfilFormResolver } from './modules/perfil/pages/form/perfil-form.resolver';
import { UserListComponent } from './modules/user/pages/list/user-list.component';
import { UserFormResolver } from './modules/user/pages/form/user-form.resolver';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: TemplateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            component: PerfilListComponent
          },
          {
            path: 'add',
            component: PerfilFormComponent
          },
          {
            path: ':id',
            component: PerfilFormComponent,
            resolve: {
              perfil: PerfilFormResolver
            }
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            component: UserListComponent
          },
          {
            path: 'add',
            component: UserFormComponent
          },
          {
            path: ':id',
            component: UserFormComponent,
            resolve: {
              perfil: UserFormResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
