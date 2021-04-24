import {
  HttpClient,
  HttpHeaders,
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
export class ManageService {

  constructor(private httpClient: HttpClient) {}

  createStudent(student_info): Observable < any > {
    var data = {
      name: student_info.value.student_name,
      id: student_info.value.student_id,
      email: student_info.value.student_email,
      phone: student_info.value.student_phone,
    }
    return this.httpClient.post < any > ("http://127.0.0.1:8001/181229424893bb65d94a74c2132b8b9e5adfe851464fdb5cb9f49e8a8204be7b", data, {
      headers: new HttpHeaders,
    }).pipe(delay(1500))
  }

  getAllStudent(): Observable < any > {
    return this.httpClient.get < any > ("http://127.0.0.1:8001/181229424893bb65d94a74c2132b8b9e5adfe851464fdb5cb9f49e8a8204be7b", {
      headers: new HttpHeaders,
    }).pipe(delay(1500))
  }

  deleteStudent(student_id): Observable < any > {
    return this.httpClient.delete < any > (`http://127.0.0.1:8001/181229424893bb65d94a74c2132b8b9e5adfe851464fdb5cb9f49e8a8204be7b/${student_id}`, {
      headers: new HttpHeaders,
    }).pipe(delay(1500))
  }
}