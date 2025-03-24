import { Component } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-flat-form',
  standalone: false,
  templateUrl: './flat-form.component.html',
  styleUrl: './flat-form.component.css'
})
export class FlatFormComponent {

  flats = [
    { id: 1, flatName: "firstFlat" },
    { id: 2, flatName: "secondFlat" },
    { id: 3, flatName: "thirdFlat" },
    { id: 4, flatName: "fourthFlat" },
  ]
  selectedFlat: any;

  contactMethods = [
    { id: 1, method: 'Mail' },
    { id: 2, method: 'Phone' },
    { id: 3, method: 'Message' }
  ];

  submit(frm: NgForm) {
    console.log(frm);
  }
  log(x: NgModel) {
    console.log(x);
  }
}
