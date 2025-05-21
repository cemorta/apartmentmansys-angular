import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  
  sendMessage(message: string, userId: number): Observable<string> {
    const body = {
      message: message,
      userId: userId
    };
    return this.http.post(`${environment.apiUrl}/api/chat/send`, body, { responseType: 'text' });
  }
}
