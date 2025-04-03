import {Component} from '@angular/core';
import {Flat} from '../../models/flat.model'; // adjust the path
import {FlatService} from '../../services/flat.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-flat',
  standalone: false,
  templateUrl: './create-flat.component.html',
  styleUrl: './create-flat.component.css'
})

export class CreateFlatComponent {
  flat: Flat = {
    id: -1,
    apartment: null,
    owner: null,
    createdAt: '',
    flatNumber: '',
    floorNumber: 1,
    area: 0,
    numBedrooms: 0,
    numBathrooms: 0,
    apartmentId: 0 // you can add this to your DTO if needed
  };

  isSubmitted = false;
  errorMessage = '';

  constructor(
    private flatService: FlatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // fetch apartment info if needed
    this.flat.apartmentId = Number(this.route.snapshot.paramMap.get('id'));
    // You might already have the apartment from parent or route resolver
  }

  onSubmit() {
    this.flatService.createFlat(this.flat).subscribe({
      next: () => {
        this.isSubmitted = true;
        this.errorMessage = '';
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to create flat. Please try again.';
      }
    });
  }
}
