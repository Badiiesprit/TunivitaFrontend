import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../model/user';
import { Image } from 'src/app/model/image';
import { environment } from 'src/app/environments/environment';
import jwt_decode from 'jwt-decode';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/admin/user/user.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  selectedUser: any;
  user: User = new User();
  public baseurl = environment.url;
  public image: Image = new Image();

  @Input() sidebarId: string = 'sidebar';
  username: string;
  password: string;
  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  userId: string;
  returnIdSubscription: Subscription;
  public infouser:any;
  public baseUrl = environment.url;
  public userRole:any;

  constructor(
    private classToggler: ClassToggleService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private http: HttpClient
  ) {
    super();
    const token: any = localStorage.getItem('token');
    // Get the role from the token using jwt-decode library
    // if (token && token != '') {
    //   const decodedToken: any = jwt_decode(token);
    //   this.userId = decodedToken.userId;
    //   this.image = decodedToken.image;
    //   this.image = this.image as Image;
    //   console.log(this.image);

    //   console.log(decodedToken);
    // }
      if(token && token!=""){
      // Get the role from the token using jwt-decode library
      const decodedToken: any = jwt_decode(token);
      this.infouser = decodedToken;
      this.userRole = decodedToken.role;
      console.log("User Role:", this.userRole);
      console.log("decodedToken");
      console.log(decodedToken);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }
}
