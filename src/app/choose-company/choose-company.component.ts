import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-choose-company',
  templateUrl: './choose-company.component.html',
  styleUrls: ['./choose-company.component.scss']
})
export class ChooseCompanyComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  centered = true;

  company_info = [{
    company_name: '中華電信',
    choose: false
  }, {
    company_name: '台達電子工業',
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

  choose_company_submit(){
    var company_result = []
    this.company_info.forEach(item => {
      if(item.choose === true)
        company_result.push(item.company_name)
    })
    console.log(company_result)
  }
}
