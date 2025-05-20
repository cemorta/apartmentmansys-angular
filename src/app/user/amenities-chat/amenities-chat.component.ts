import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
 chatForm: FormGroup;
  messages: { text: string, sender: 'user' | 'bot' }[] = [];

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });

    // Başlangıç mesajı
    this.messages.push({
      text: 'Hi! How can I help you?',
      sender: 'bot'
    });
  }

  sendMessage(): void {
    const message = this.chatForm.get('message')?.value.trim();
    if (!message) return;

    // Kullanıcı mesajı
    this.messages.push({ text: message, sender: 'user' });

    // Bot cevabı
    this.messages.push({ text: 'Thanks, I got your request!', sender: 'bot' });

    this.chatForm.reset();
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 100);
  }
}
