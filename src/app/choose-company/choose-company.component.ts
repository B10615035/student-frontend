import {
  Component,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  AppService
} from '../app.service';
import { InfoDialogComponent } from '../dialog/info-dialog/info-dialog.component';
import { SpinDialogComponent } from '../dialog/spin-dialog/spin-dialog.component';

@Component({
  selector: 'app-choose-company',
  templateUrl: './choose-company.component.html',
  styleUrls: ['./choose-company.component.scss']
})
export class ChooseCompanyComponent implements OnInit {

  constructor(private appService: AppService, private dialog:MatDialog, private router:Router) {}

  ngOnInit(): void {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.getStudent(spinDialog, '')
    this.studentName = this.appService.getStudentInfo()[0]
    this.studentID = this.appService.getStudentInfo()[1]
  }

  showWilling: boolean
  showChoose: boolean
  willingList: string[] = []
  studentName:string = ""
  studentID:string = ""

  company_info = [{
    company_name: '中華電信',
    choose: false
  }, {
    company_name: '台達電子',
    choose: false
  }, {
    company_name: '邑富',
    choose: false
  }, {
    company_name: '利凌企業',
    choose: false
  }, {
    company_name: '英業達',
    choose: false
  }, {
    company_name: '研揚科技',
    choose: false
  }, {
    company_name: '鈊象電子',
    choose: false
  }, {
    company_name: '緯創資通',
    choose: false
  }, ]

  getStudent(spinDialog, info){
    this.appService.getStudent().subscribe(
      next => {
        spinDialog.close()
        if(info)
          this.dialog.open(InfoDialogComponent, {
            data: {
              result: info
            }
          })
        this.willingList = next.info.company
        if (this.willingList.length == 0) {
          this.showChoose = true
          this.showWilling = false
        } else {
          this.showChoose = false
          this.showWilling = true
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  choose_company_submit() {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    var company_result = {
      company: []
    }
    this.company_info.forEach(item => {
      if (item.choose === true)
        company_result.company.push(item.company_name)
    })
    this.appService.updateStudent(company_result).subscribe(
      next => {
        this.getStudent(spinDialog , next)
      },
      error => {
        console.log(error)
      }
    )
  }

  update_company_submit() {
    this.showChoose = true
  }

  logout_submit(){
    this.appService.deleteCookie()
    this.router.navigate(["login"])
  }
}
