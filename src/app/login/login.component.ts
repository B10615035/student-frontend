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
  MatSnackBar
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {}

  login_info = new FormGroup({
    student_name: new FormControl('', Validators.required),
    student_id: new FormControl('', Validators.required)
  })

  login_submit() {
    if (this.login_info.value.student_id == '' || this.login_info.value.student_name == '') {
      this.snackBar.open('內容不能為空', 'Close', {
        duration: 1500,
        panelClass: 'warn_snackBar'
      })
    }
    else{
      this.router.navigate([''])
    }
  }
}
