import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; //
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  
  trips!: Trip[];
  message: string = '';

  // Inject Router in the constructor
  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) { }

  // Method to handle the Add Trip button click
  public addTrip(): void {
    console.log('Inside TripListingComponent#addTrip');
    this.router.navigate(['add-trip']); // Navigates to the new route
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          // ... rest of your logic
        },
        error: (err: any) => {
          console.log('Error: ' + err);
        }
      });
  }

  ngOnInit(): void {
    this.getStuff();
  }
}