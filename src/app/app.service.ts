import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  delay
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) {}

  token: string = ""
  studentID:string = ""

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
    return this.httpClient.put < any > (`http://127.0.0.1:8001/student/${this.studentID}`,data ,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    }).pipe(delay(1500))
  }

  getStudent(): Observable < any > {
    return this.httpClient.get < any > (`http://127.0.0.1:8001/student/${this.studentID}` ,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    }).pipe(delay(1500))
  }
}
