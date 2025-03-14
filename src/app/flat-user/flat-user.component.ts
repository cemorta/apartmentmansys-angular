import {Component, OnInit} from '@angular/core';
import {FlatUserService} from '../flat-user.service';

@Component({
  selector: 'app-flat-user',
  standalone: false,
  templateUrl: './flat-user.component.html',
  styleUrl: './flat-user.component.css'
})
export class FlatUserComponent implements OnInit {
  result: any[] = [];
  constructor(private flatUserService: FlatUserService) {}

  ngOnInit(): void {
    this.flatUserService.getFlatUser().subscribe(
      response => {
        this.result = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
}
