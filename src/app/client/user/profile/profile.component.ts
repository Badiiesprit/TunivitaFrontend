import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import jwt_decode from 'jwt-decode';
import { User } from "../../../model/user"
import { environment } from 'src/app/environments/environment';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  userId: string;
  decodedToken: any | null;
  user: User = new User();
  public baseurl = environment.url;
  public image:Image = new Image();


  constructor() { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwt_decode(token);
      console.log(this.decodedToken);

      this.userId = this.decodedToken.userId;
      console.log(this.userId);
      this.image = this.user.image as Image;

    } else {
      console.error('Token is null. Please log in.');
    }
  }
}
