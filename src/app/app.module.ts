import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InformationComponent } from './information/information.component';
import { ChooseCompanyComponent } from './choose-company/choose-company.component';
import { MatRippleModule } from '@angular/material/core';
import { CreateStudentComponent } from './create-student/create-student.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinDialogComponent } from './spin-dialog/spin-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InformationComponent,
    ChooseCompanyComponent,
    CreateStudentComponent,
    SpinDialogComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatRippleModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  entryComponents:[SpinDialogComponent, ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
