import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/admin/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading: boolean = false;
  user: User = new User();

  constructor(private userService: UserService, private http: HttpClient) {}

  addUser() {
    this.loading = true;

    this.userService.add(this.user).subscribe(
      (response) => {
        // User added successfully
        console.log('User added:', response);
        // Reset the form or perform any other necessary actions
        this.user = new User();
        this.loading = false;
      },
      (error) => {
        console.error('Error adding user:', error);
        this.loading = false;
      }
    );

    this.http.post('http://localhost:5050/users', this.user).subscribe(
      (response) => {
        console.log('User added to the database successfully.');
        // You can perform any additional actions after adding the user.
        this.loading = false;
      },
      (error) => {
        console.error('Error adding user to the database:', error);
        // Handle any errors that occurred during the database operation.
        this.loading = false;
      }
    );
  }
}
