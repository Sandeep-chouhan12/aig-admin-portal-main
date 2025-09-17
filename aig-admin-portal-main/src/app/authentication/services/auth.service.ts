import { Injectable } from '@angular/core';
import { LoginRequest } from '../payload/login-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../../shared/utils/api-routes';
import { Router } from '@angular/router';
import { ForgetPasswordRequest } from '../payload/forget-password-request';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import jwt_decode from 'jwt-decode';
import { ChangePasswordRequest } from 'src/app/shared/models/change-password-request';
import { UpdateAdminRequest } from 'src/app/shared/models/update-admin-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Constant for accessing the access token in local storage
  public static ACCESS_TOKEN = 'accessToken';
  user$: any;

  // Constructor injecting HttpClient for making HTTP requests
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Set the access token in local storage.
   * @param token - The access token to be stored.
   */
  public setToken(token: string): void {
    localStorage.setItem(AuthService.ACCESS_TOKEN, token);
  }

  /**
   * Get the access token from local storage.
   * @returns The access token if present, otherwise null.
   */
  public getToken(): string | null {
    let token = localStorage.getItem(AuthService.ACCESS_TOKEN);
    if (token != null) return token;
    return null;
  }

  /**
   * Perform admin login by sending login credentials to the server.
   * @param loginCredential - The login credentials.
   * @returns An Observable with the HTTP response.
   */
  public loginAdmin(loginCredential: LoginRequest): Observable<any> {
    return this.http.post<any>(ApiRoutes.ADMIN_LOGIN, loginCredential);
  }

  /**
   * Send a one-time password (OTP) for password recovery to the server.
   * @param forgetPassword - The request for password recovery.
   * @returns An Observable with the HTTP response.
   */
  public sendOTP(forgetPassword: ForgetPasswordRequest): Observable<any> {
    return this.http.post<any>(ApiRoutes.SEND_OTP_TO_EMAIL, forgetPassword);
  }

  /**
   * Verify the one-time password (OTP) for password recovery.
   * @param forgetPassword - The request for password recovery.
   * @returns An Observable with the HTTP response.
   */
  public verifyOTP(forgetPassword: ForgetPasswordRequest): Observable<any> {
    return this.http.post<any>(ApiRoutes.VERIFY_OTP, forgetPassword);
  }

  /**
   * Set a new password after password recovery.
   * @param forgetPassword - The request for password recovery.
   * @returns An Observable with the HTTP response.
   */
  public setNewPassword(
    forgetPassword: ForgetPasswordRequest
  ): Observable<any> {
    return this.http.post<any>(ApiRoutes.SET_NEW_PASSWORD, forgetPassword);
  }

  /**
   * Retrieves the logged-in user information from the server.
   * Requires a valid authentication token.
   * @returns An observable with the user information.
   */
  public getLoggedInUser(): Observable<any> {
    // Retrieve the authentication token
    let token = this.getToken();

    // Make an HTTP GET request to the GET_ADMIN API route
    return this.http.get<any>(ApiRoutes.GET_ADMIN);
  }

  /**
   * Navigates to the specified component based on the provided path.
   * @param path - The route path to navigate to.
   */
  public navigateToComponent(path: any): void {
    this.router.navigate([path]);
  }

  /**
   * Logs the user out by clearing the local storage and navigating to the home page.
   */
  public logOut(): void {
    // Clear local storage to log out the user
    localStorage.clear();

    // Navigate to the home page
    this.router.navigate([ComponentsRoutes.LOGIN]);
  }

  /**
   * Decodes the access token using the jwt-decode library.
   * @param token - The JWT access token to be decoded.
   * @returns Decoded token payload or null if decoding fails.
   */
  public getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      // Return null in case of decoding error
      return null;
    }
  }

  /**
   * Retrieves the user role from the decoded JWT token.
   * @returns User role or null if the token or role is not present.
   */
  public getRole(): string | null {
    let token = this.getToken();

    if (token !== null) {
      let tokenData = this.getDecodedAccessToken(token);

      if (tokenData !== null) {
        // Return the user role from the decoded token
        return tokenData.Role;
      }
    }

    // Return null if the token or role is not present
    return null;
  }

  getRoleId() {
    let token = this.getToken();

    if (token !== null) {
      let tokenData = this.getDecodedAccessToken(token);

      if (tokenData !== null) {
        // Return the user role from the decoded token
        return tokenData.roleId;
      }
    }

    // Return null if the token or role is not present
    return null;
  }



  public getUserRole(): string | null {
    let token = this.getToken();

    if (token !== null) {
      let tokenData = this.getDecodedAccessToken(token);

      if (tokenData !== null) {
        // Return the user role from the decoded token
        return tokenData.userRole;
      }
    }

    // Return null if the token or role is not present
    return null;
  }

  /**
   * Checks if the JWT token is expired.
   * @returns True if the token is expired, false otherwise.
   */
  public isTokenExpired(): boolean {
    let token = this.getToken();

    if (token !== null) {
      const decodedToken = this.getDecodedAccessToken(token);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

      // Compare the expiration time with the current time
      return expirationTime < Date.now();
    }

    // Return true if the token is not present
    return true;
  }

  /**
   * Changes the user password.
   * @param changePassReq - An object containing the necessary data for changing the password.
   * @returns An observable with the result of the password change request.
   */
  public changePassword(changePassReq: ChangePasswordRequest): Observable<any> {
    return this.http.post<any>(ApiRoutes.CHANGE_PASSWORD, changePassReq);
  }

  /**
   * Update an admin's profile information including their profile picture.
   * @param updateAdmin An object containing the admin's updated information.
   * @returns A promise that resolves with the updated admin data.
   */
  public updateAdmin(updateAdmin: UpdateAdminRequest): Observable<any> {
    let formData = new FormData();
    updateAdmin.profilePicture instanceof File &&
      formData.append('profilePicture', updateAdmin.profilePicture);
    formData.append('firstName', updateAdmin.firstName);
    formData.append('lastName', updateAdmin.lastName);
    return this.http.put<any>(ApiRoutes.UPDATE_ADMIN, formData);
  }
}
