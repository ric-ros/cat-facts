import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatFactsComponent } from './pages/cat-facts/cat-facts.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';

const accountModule = () =>
  import('./pages/account/account.module').then((x) => x.AccountModule);
const usersModule = () =>
  import('./pages/users/users.module').then((x) => x.UsersModule);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService],
  },
  {
    path: 'catFacts',
    component: CatFactsComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuardService] },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
