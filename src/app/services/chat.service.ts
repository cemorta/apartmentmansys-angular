import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {}

  /**
   * Sends a user message to the backend, which forwards it to n8n & returns the AI's reply
   * @param message The user's message
   */
  sendMessage(message: string): Observable<string> {
    return this.http.post(`${environment.apiUrl}/api/chat/send`, message, { responseType: 'text' });
  }
}
