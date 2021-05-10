import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  MatTableDataSource
} from '@angular/material/table';
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

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit(): void {
    var spinDialog = this.dialog.open(SpinDialogComponent)
    this.appService.getSchedule().subscribe(
      next => {
        this.create_table(next.info)
      }
    )

    this.appService.getStudent().subscribe(
      next => {
        spinDialog.close()
        this.create_schedule(next.info)
      }
    )
  }

  displayedColumns: string[] = ["Time", "Program", "Remark"]
  dataSource
  willing_list = []

  create_table(data) {

    data.forEach(item => {
      item.program = item.program.replace(",", "<br>")
      item.remark = item.remark.replace(",", "<br>")
    });
    this.dataSource = new MatTableDataSource(data)
  }

  create_schedule(data) {
    console.log(data)
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
        willing: null
      })
    }
  }

}
