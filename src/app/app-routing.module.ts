import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CasesComponent } from './components/cases/cases.component';
import { LoginComponent } from './components/login/login.component';
import { VictimsComponent } from './components/victims/victims.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cases', component: CasesComponent },
  { path: 'victims', component: VictimsComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
