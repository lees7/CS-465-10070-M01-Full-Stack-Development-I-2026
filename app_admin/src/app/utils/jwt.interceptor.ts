import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isAuthAPI: boolean;

    // Check if the request is for login or register
    if (request.url.includes('login') || request.url.includes('register')) {
      isAuthAPI = true;
    } else {
      isAuthAPI = false;
    }

    // If logged in and NOT an auth API call, clone the request and add the header
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      const token = this.authenticationService.getToken();
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }

    // Otherwise, just pass the original request through
    return next.handle(request);
  }
}

// Export the provider to be used in app.config.ts
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};