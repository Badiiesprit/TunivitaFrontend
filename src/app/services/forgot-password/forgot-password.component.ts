import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string;
  message: string;

  constructor(private http: HttpClient) {}

  resetPassword() {
    if (!this.email) {
      this.message = 'Please enter your email address.';
      return;
    }

    const apiUrl = 'http://localhost:5050/forgotPasswordEmail/forgot-password/'; // Replace with your API URL

    // Send a POST request to the server to initiate the password reset
    this.http.post(apiUrl, { email: this.email })
      .subscribe(
        (response: any) => {
          this.message = response.message;
        },
        (error: any) => {
          this.message = 'An error occurred while resetting the password. Please try again later.';
        }
      );
  }
}
