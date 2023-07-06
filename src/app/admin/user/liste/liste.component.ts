import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/admin/user/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
import { User } from 'src/app/model/user';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  users: any[] = [];
  token: string;
  selectedUser:any;
  user:User;


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.userService.get().subscribe(
      (response) => {
        this.users = response;
        $(document).ready(function() {
          $('#myTable').DataTable({
            columnDefs: [{
              targets: 'no-sort',
              orderable: false
            }]
          });
        });
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );

    }

    disableUser(user: any) {
      this.userService.disableUser(user._id).subscribe(
        () => {
          console.log('User disabled successfully');
        },
        (error) => {
          console.error('Error disabling user:', error);
        }
      );
    }


    updateUser(user: any) {
      this.router.navigate(['update', user._id]);
    }


    toggleService(user: User) {
      console.log(user._id);
      this.userService.disableUser(user._id).subscribe((response: any) => {
        if (response.disable !== undefined) {
          user.disable = response.disable;
        }
      });
    }

    userModal() {
      this.router.navigate(['userModal']);
    }

    getUserInfo(userId: string) {
      this.userService.getById(userId).subscribe(
        (response) => {
          if (response.result) {
            this.user = response.result;
            console.log(response);
            alert(`firstname: ${response.result.firstname}\nLastname: ${response.result.Lastname}\nEmail: ${response.result.email}\nGender: ${response.result.gender}`);
          }
        }
      );
    }

}
