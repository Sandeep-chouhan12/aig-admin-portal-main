import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { AppUtil } from '../utils/app-util';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  private token: string | null = null;
  private lastActivityTime: number | null = null;
  private readonly tokenExpirationTime = 36000 * 1000;  // 36000 seconds = 10 hours

  constructor() { }

  // Method to update last activity time
  updateTime() {
    localStorage.setItem('lastActivityTime', Date.now().toString());
    this.lastActivityTime = Date.now();
  }

  // Method to get token
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem(AuthService.ACCESS_TOKEN);
    }
    return this.token;
  }

  // Method to check if token is expired
  isTokenExpired(): boolean {
    const lastActivityTime = this.getLastActivityTime();

    if (!this.lastActivityTime && localStorage.getItem(AuthService.ACCESS_TOKEN) !== null) {
      this.updateTime();
    } else if (this.lastActivityTime && lastActivityTime !== this.lastActivityTime) {
      localStorage.clear();
      AppUtil.openToast('error', 'Session expired.', 'Error');
      return true;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - lastActivityTime!;
    return elapsedTime > this.tokenExpirationTime;
  }

  // Method to get the last activity time
  private getLastActivityTime(): number | null {
    const lastActivityTime = localStorage.getItem('lastActivityTime');
    return lastActivityTime ? parseInt(lastActivityTime, 10) : null;
  }
}
