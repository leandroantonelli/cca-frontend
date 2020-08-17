import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/page/login.component';
import { TemplateComponent } from './modules/template/template.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './modules/dashboard/page/dashboard.component';
import { PerfilListComponent } from './modules/perfil/pages/list/perfil-list.component';
import { PerfilFormComponent } from './modules/perfil/pages/form/perfil-form.component';
import { UserListComponent } from './modules/user/pages/list/user-list.component';
import { UserFormComponent } from './modules/user/pages/form/user-form.component';
import { PerfilFormResolver } from './modules/perfil/service/perfil-form.resolver';
import { UserFormResolver } from './modules/user/service/user-form.resolver';

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
              user: UserFormResolver
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
