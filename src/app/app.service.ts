import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  CookieService
} from 'ngx-cookie-service';
import {
  Observable
} from 'rxjs';
import {
  delay,
  map,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  // url = "http://3.113.9.185:8001"
  url = "http://127.0.0.1:8001"

  loginRequest(login_info): Observable < any > {
    var data = {
      name: login_info.value.student_name,
      id: login_info.value.student_id
    }
    return this.httpClient.post < any > (`${this.url}/student/login`, data, {
      headers: new HttpHeaders,
    }).pipe(delay(1500))
  }

  getSchedule(): Observable < any > {
    return this.httpClient.get < any > (`${this.url}/company/schedule`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken()),
    })
  }

  updateWilling(data): Observable < any > {
    return this.httpClient.put < any > (`${this.url}/student/willing/${this.cookieService.get('studentID')}`, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken()),
    }).pipe(delay(1500))
  }

  updateStudent(data): Observable < any > {
    return this.httpClient.put < any > (`${this.url}/student/${this.cookieService.get('studentID')}`, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken()),
    }).pipe(delay(1500))
  }

  getStudent(): Observable < any > { 
    return this.httpClient.get < any > (`${this.url}/student/${this.cookieService.get('studentID')}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken()),
    }).pipe(delay(1500))
  }

  setCookie(token, studentInfo) {
    this.cookieService.set("token", token)
    this.cookieService.set("studentID", studentInfo.student_id)
    this.cookieService.set("studentName", studentInfo.student_name)
  }

  checkTokenInService(): Observable < any > {
    return this.checkToken().pipe(
      map(data => {
        return data.info
      })
    )
  }

  checkToken(): Observable < any > {
    var data = this.getToken()
    if (!data)
      data = "login"
    return this.httpClient.post < any > (`${this.url}/auth`, {
      token: data
    }, {
      headers: new HttpHeaders(),
    })
  }

  getToken() {
    return this.cookieService.get('token')
  }

  getStudentInfo(){
    return [this.cookieService.get("studentName"), this.cookieService.get("studentID")]
  }

  checkCookie() {
    return this.cookieService.check('token')
  }

  deleteCookie(){
    this.cookieService.deleteAll()
  }
}
