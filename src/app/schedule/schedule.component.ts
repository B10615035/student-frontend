import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  Router
} from '@angular/router';
import {
  exit
} from 'process';
import {
  range
} from 'rxjs';
import {
  AppService
} from '../app.service';
import {
  SpinDialogComponent
} from '../dialog/spin-dialog/spin-dialog.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private appService: AppService, private dialog: MatDialog, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.studentName = this.appService.getStudentInfo()[0]
    this.studentID = this.appService.getStudentInfo()[1]
    this.appService.getSchedule().subscribe(
      next => {
        this.create_table(next.info)
      }
    )
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.getStudent(spinDialog)
  }

  displayedColumns: string[] = ["Time", "Program", "Remark"]
  dataSource
  willing_list = []
  final_willing_list = []
  showWilling: boolean
  showChoose: boolean
  studentName: string = ""
  studentID: string = ""
  resultData

  getStudent(spinDialog) {
    this.appService.getStudent().subscribe(
      next => {
        spinDialog.close()
        this.resultData = next.info
        if (next.info.willing_name.length == 0) {
          this.showChoose = true
          this.showWilling = false
          this.create_schedule()
        } else {
          this.showChoose = false
          this.showWilling = true
          this.show_willing()
        }
      }
    )
  }

  update_willing() {
    this.showChoose = true
    this.showWilling = true
    this.create_schedule()
  }

  show_willing() {
    this.final_willing_list = []
    var data = this.resultData
    for (let i in data.willing_name) {
      this.final_willing_list.push({
        name: data.willing_name[i],
        willing: data.willing_order[i]
      })
    }

    this.final_willing_list = this.final_willing_list.sort((a, b) => {
      if (a.willing < b.willing)
        return -1
      else
        return 0
    })
  }

  create_table(data) {

    data.forEach(item => {
      item.program = item.program.replace(",", "<br>")
      item.remark = item.remark.replace(",", "<br>")
    });
    this.dataSource = new MatTableDataSource(data)
  }

  create_schedule() {
    this.willing_list = []
    var data = this.resultData
    var start = ["9:40", "10:15", "10:50", "11:25", "13:00", "13:35", "14:10", "14:45"]
    var end = ["10:10", "10:45", "11:20", "11:55", "13:30", "14:05", "14:40", "15:15"]

    var classRoom = new Map

    classRoom["中華電信"] = "TR-509"
    classRoom["台達電子"] = "TR-510"
    classRoom["邑富"] = "TR-517"
    classRoom["利凌企業"] = "TR-511"
    classRoom["英業達"] = "TR-514"
    classRoom["研揚科技"] = "TR-512"
    classRoom["鈊象電子"] = "TR-515"
    classRoom["緯創資通"] = "TR-516"

    for (let i in data.stage_one_index) {
      var index = data.stage_one_index[i]
      this.willing_list.push({
        start: start[index],
        end: end[index],
        company: data.stage_one[i],
        classroom: classRoom[data.stage_one[i]],
        willing: ""
      })
    }
  }

  logout_submit() {
    this.appService.deleteCookie()
    this.router.navigate(["login"])
  }

  submit_willing() {
    var result_data = {
      willing_name: [] as any,
      willing_order: [] as any
    }

    this.willing_list.forEach(item => {
      if (Number(item.willing) > 0) {
        result_data.willing_name.push(item.company)
        result_data.willing_order.push(Number(item.willing))
      }
    });

    for (let i = 0; i < result_data.willing_name.length; i++) {
      if (!result_data.willing_order.includes(i + 1)) {
        this.snackBar.open(`請按照順序填寫`, 'Close', {
          duration: 1000,
          panelClass: 'warn_snackBar'
        })
        exit()
      }
    }



    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.updateWilling(result_data).subscribe(
      next => {
        this.getStudent(spinDialog)
      }
    )
  }
}