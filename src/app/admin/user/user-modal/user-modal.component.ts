import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/admin/user/user.service';
import { User } from '../../../model/user';
import { TokenService } from 'src/app/services/token/token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  token: string;
  selectedUser:any;
  user: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.userService.getById(id).subscribe(
          (response) => {
            if (response.result) {
              console.log(response.result);
              this.user = response.result;
            }
          }
        );
      }
    });
  }
}
