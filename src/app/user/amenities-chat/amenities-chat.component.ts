import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ChatService} from '../../services/chat.service';
import { AmenityService } from '../../services/amenity.service';

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

  constructor(private fb: FormBuilder, private chatService: ChatService, private amenityService: AmenityService) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;  // Eğer user.id sayısal değilse Number(user.id) yap
    }

    this.amenityService.getAmenities().subscribe({
    next: (amenities) => {
       console.log('Amenities:', amenities);
      if (amenities.length === 0) {
        this.messages.push({
          text: `Hi! Currently there are no amenities available. Please check back later.`,
          sender: 'bot'
        });
      } else {
        const amenityTitles = amenities.map(a => `- ${a.title}`).join('\n');
        this.messages.push({
          text: `Hi! Here are the available amenities:\n${amenityTitles}\n\nYou can ask me to reserve any of them or inquire about availability.`,
          sender: 'bot'
        });
      }
    },
    error: (err) => {
      console.error('Amenity list fetch error:', err);
      this.messages.push({
        text: `Hi! I couldn't fetch the list of amenities right now. Please try again later.`,
        sender: 'bot'
      });
    }
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
