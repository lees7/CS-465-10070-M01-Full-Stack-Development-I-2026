import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) { }
  
  url = 'http://localhost:3000/api/trips';

  // Fetches all trips from the database
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  // Adds a new trip record to the database
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  // Grabs a single trip record by its unique code
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  // Updates an existing trip record
  updateTrip(formData: Trip): Observable<Trip> {
    // Uses the HTTP PUT verb to update the specific record
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }
}