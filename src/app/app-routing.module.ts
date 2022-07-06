import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatFactsComponent } from './pages/cat-facts/cat-facts.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catFacts', component: CatFactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
