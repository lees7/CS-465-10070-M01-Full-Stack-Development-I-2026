import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule],
  // Ensure these match your actual renamed .html and .css files
  templateUrl: './add-trip.component.html', 
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit { 
  constructor() { }
  ngOnInit(): void { }
}