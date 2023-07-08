import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { User } from '../../../model/user';
import { environment } from 'src/app/environments/environment';
import { Image } from 'src/app/model/image';
import { UserService } from '../../../services/admin/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userId: string;
  decodedToken: any | null;
  user: User = new User();
  public baseurl = environment.url;
  public image: Image = new Image();

  constructor(private userService: UserService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwt_decode(token);
      console.log(this.decodedToken);

      this.userId = this.decodedToken.userId;
      console.log(this.userId);
      if (this.userId) {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        this.userService.getById(this.userId).subscribe(
          (response) => {
            if (response.result) {
              console.log(response.result);
              this.user = response.result;
              this.image = this.user.image as Image;
            }
          },
          (error) => {
            console.error('Error fetching user:', error);
          }
        );
      } else {
        console.error('Token is null. Please log in.');
      }
    }
  }
}
