import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCompanyComponent } from './choose-company/choose-company.component';
import { InformationComponent } from './information/information.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'information', component: InformationComponent},
  {path:'choose_company', component: ChooseCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
