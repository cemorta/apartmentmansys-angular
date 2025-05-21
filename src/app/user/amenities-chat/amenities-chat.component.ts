import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ChatService} from '../../services/chat.service';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}
@Component({
  selector: 'app-amenities-chat',
  standalone: false,
  templateUrl: './amenities-chat.component.html',
  styleUrl: './amenities-chat.component.css'
})
export class AmenitiesChatComponent {
  botResponse: string = '';
  userId: number = 0;
  
  chatForm: FormGroup;
  messages: { text: string, sender: 'user' | 'bot' }[] = [];

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private fb: FormBuilder, private chatService: ChatService) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;  // Eğer user.id sayısal değilse Number(user.id) yap
    }

    // Başlangıç mesajı
    this.messages.push({
      text: 'Hi! How can I assist you with amenity reservations or related requests?',
      sender: 'bot'
    });
  }

  sendMessage(): void {
    const message = this.chatForm.get('message')?.value.trim();
    if (!message) return;

    // Add user message to chat
    this.messages.push({ text: message, sender: 'user' });

    // Reset form early
    this.chatForm.reset();

    // Call API and add bot response ONLY after it returns
    this.chatService.sendMessage(message, this.userId).subscribe({
      next: (response) => {
        // Add bot message to chat only after we receive it
        this.messages.push({ text: response, sender: 'bot' });
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error from bot:', err);
        // Optional: Add error message to chat
        this.messages.push({
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'bot'
        });
        this.scrollToBottom();
      }
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 100);
  }
}
