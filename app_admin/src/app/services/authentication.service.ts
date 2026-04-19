import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  authResp: AuthResponse = new AuthResponse();

  public getToken(): string {
    const out = this.storage.getItem('travlr-token');
    if (!out) {
      return '';
    }
    return out;
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      // Decode the payload part of the JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Check if the expiration time is greater than the current time
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return new User();
  }

  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value && value.token) {
            this.saveToken(value.token);
          }
        },
        error: (error: any) => {
          console.log('Login Error: ' + error);
        }
      });
  }

  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value && value.token) {
            this.saveToken(value.token);
          }
        },
        error: (error: any) => {
          console.log('Registration Error: ' + error);
        }
      });
  }
}