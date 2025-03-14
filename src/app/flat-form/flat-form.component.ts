import { Component } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-flat-form',
  standalone: false,
  templateUrl: './flat-form.component.html',
  styleUrl: './flat-form.component.css'
})
export class FlatFormComponent {

  submit(frm: NgForm) {
    console.log(frm);
  }
  log(x: NgModel) {
    console.log(x);
  }
}
