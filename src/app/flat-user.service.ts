import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlatUserService {

  constructor(private http: HttpClient) {}

  getFlatUser(): Observable<any> {
    return this.http.get('http://localhost:8080/flat-owner/all');
  }
}

// <form> label+input{type='text'}.form-control </form>
