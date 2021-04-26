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
  tap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  studentID: string = ""

  loginRequest(login_info): Observable < any > {
    var data = {
      name: login_info.value.student_name,
      id: login_info.value.student_id
    }
    return this.httpClient.post < any > (`http://127.0.0.1:8001/student/login`, data, {
      headers: new HttpHeaders,
    }).pipe(delay(1500))
  }

  updateStudent(data): Observable < any > {
    return this.httpClient.put < any > (`http://127.0.0.1:8001/student/${this.cookieService.get('user')}`, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(1500))
  }

  getStudent(): Observable < any > {
    return this.httpClient.get < any > (`http://127.0.0.1:8001/student/${this.cookieService.get('user')}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getCookie()),
    }).pipe(delay(1500))
  }

  setCookie(token) {
    this.cookieService.set("token", token)
    this.cookieService.set("user", this.studentID)
  }

  checkTokenInService(): Observable < any > {
    return this.checkToken().pipe(
      map(data => {
        return data.info
      })
    )
  }

  checkToken(): Observable < any > {
    var data = this.getCookie()
    if (!data)
      data = "login"
    return this.httpClient.post < any > (`http://127.0.0.1:8001/auth`, {
      token: data
    }, {
      headers: new HttpHeaders(),
    })
  }

  getCookie() {
    return this.cookieService.get('token')
  }

  checkCookie() {
    return this.cookieService.check('token')
  }
}
