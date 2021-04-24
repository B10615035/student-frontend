import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild
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
} from '../../dialog/spin-dialog/spin-dialog.component';
import {
  delay
} from 'rxjs/operators';
import {
  InfoDialogComponent
} from '../../dialog/info-dialog/info-dialog.component';
import {
  ManageService
} from '../manage.service';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatTableDataSource
} from '@angular/material/table';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private dialog: MatDialog, private manageService: ManageService) {}
  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;


  ngOnInit(): void {
    this.create_table()
  }

  displayedColumns: string[] = ["Name", "ID", "Phone", "Email"]
  dataSource

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
      this.create_student()
    }
  }

  async create_student() {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.manageService.createStudent(this.student_info).subscribe(
      next => {
        this.create_table()
        spinDialog.close()
        this.dialog.open(InfoDialogComponent, {
          data: {
            result: next
          }
        })
        this.student_info.reset()
      },
      error => {
        console.log(error)
      }
    )
  }

  create_table() {
    this.manageService.getAllStudent().subscribe(
      next => {
        this.dataSource = new MatTableDataSource(next)
        this.dataSource.paginator = this.paginator;
      }
    )
  }
}