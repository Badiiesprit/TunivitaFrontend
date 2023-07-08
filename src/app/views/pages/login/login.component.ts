import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../services/token/token.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username:string;
  public password:string;
  resetSuccess: boolean;

  constructor(private tokenService:TokenService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    localStorage.clear();
    this.route.queryParams.subscribe(params => {
      this.resetSuccess = params['resetSuccess'] === 'true';
    });
  }

  submitForm() {
    this.tokenService.getToken(this.password, this.username).subscribe(
      (response) => {
        if (response && response.token) {
          console.log(response.token);
          localStorage.setItem('token', response.token);

          // Get the role from the token using jwt-decode library
          const decodedToken: any = jwt_decode(response.token);
          const role = decodedToken.role;
          console.log(decodedToken);

          if (role.includes('admin')) {
            window.location.href = '/admin';
          } else if (role.includes('user')) {
            window.location.href = '/';
          } else {
            window.location.href = '/';
          }

          console.log(localStorage);
        }
      }
    );
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  goToGoogleAuthenticate() {
    window.location.href = 'http://localhost:5050/auth/google';
  }

}
