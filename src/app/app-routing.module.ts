import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChooseCompanyComponent } from './choose-company/choose-company.component';
import { InformationComponent } from './information/information.component';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';
const routes: Routes = [
  {path:'login', component: LoginComponent},
  // {path:'chooseCompany', component: ChooseCompanyComponent, canActivate:[AuthGuard]},
  {path:'', component: ScheduleComponent, canActivate:[AuthGuard]},
  {path:'schedule', component: ScheduleComponent, canActivate:[AuthGuard]}
  // {path:'', component: ChooseCompanyComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
