import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCompanyComponent } from './student/choose-company/choose-company.component';
import { CreateStudentComponent } from './manage/create-student/create-student.component';
import { InformationComponent } from './student/information/information.component';
import { LoginComponent } from './student/login/login.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'information', component: InformationComponent},
  {path:'choose_company', component: ChooseCompanyComponent},
  {path:'create_student', component:CreateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
