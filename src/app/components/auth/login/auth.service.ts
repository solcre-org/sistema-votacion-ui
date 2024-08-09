import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenKey = 'token';  
  
  constructor() {}
  
  login(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.authTokenKey);
    return !!token; 
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
  
}
