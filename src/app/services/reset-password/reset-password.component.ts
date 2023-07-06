import { Component , OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  password: string;
  confirmPassword: string;
  token: any;
  message: string;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token); // Check if the token is captured correctly
  }

  resetPassword() {
    if (!this.password || !this.confirmPassword) {
      this.message = 'Please enter your new password and confirm password.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords mismatch.';
      return;
    }

    const apiUrl = 'http://localhost:5050/forgotPasswordEmail/reset-password/'; // Replace with your API URL
    const token = window.location.href.split('/').pop();

    // Send a POST request to the server to reset the password
    this.http.post(apiUrl + this.token, { password: this.password })
      .subscribe(
        (response: any) => {
          this.message = response.message;
          this.router.navigate(['/login'], { queryParams: { resetSuccess: 'true' } });
        },
        (error: any) => {
          this.message = 'An error occurred while resetting the password. Please try again later.';
        }
      );
  }
}
