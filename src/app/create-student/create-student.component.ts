import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  Observable
} from 'rxjs';
import {
  SpinDialogComponent
} from '../spin-dialog/spin-dialog.component';
import {
  delay
} from 'rxjs/operators';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {}
  student_info = new FormGroup({
    student_name: new FormControl('', Validators.required),
    student_id: new FormControl('', Validators.required),
    student_email: new FormControl('', [Validators.required, Validators.email]),
    student_phone: new FormControl('', Validators.required),
  })

  create_student_submit() {
    var student_info_check = true
    Object.keys(this.student_info.controls).forEach(key => {
      if (this.student_info.get(key).errors) {
        student_info_check = false
        this.snackBar.open(`${key} 內容/格式錯誤`, 'Close', {
          duration: 1500,
          panelClass: 'warn_snackBar'
        })
      }
    })

    if (student_info_check) {
      var spinDialog = this.dialog.open(SpinDialogComponent)
      this.createStudent().subscribe(
        next => {
          spinDialog.close()
          this.dialog.open(InfoDialogComponent, {data: {result: next}})
          console.log(next)
          this.student_info.reset()
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  createStudent(): Observable < any > {
    var data = {
      name: this.student_info.value.student_name,
      id: this.student_info.value.student_id,
      email: this.student_info.value.student_email,
      phone: this.student_info.value.student_phone,
    }
    return this.httpClient.post < any > ("http://127.0.0.1:8001/registry", data, {
      headers: new HttpHeaders,
    }).pipe(delay(1500))
  }
}
