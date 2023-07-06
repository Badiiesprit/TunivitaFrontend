import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/admin/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public id:string;
  public firstname: string;
  public lastname: string;
  public gender: string;
  public phone: string;
  public email: string;
  public password: string;
  public cpassword: string;
  public user_image: string;
  public date_birth: Date;
  public address: string;
  public state: string;
  public city: string;
  public zip_code: string;
  public role: string;
  public disable: boolean;
  public tokens: string;
  public loginCount: number;

  constructor(
    private userService: UserService,
    private route: Router
  ) {}

  submitForm() {
    const newUser: User = {
      _id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      gender: this.gender,
      phone: this.phone,
      email: this.email,
      password: this.password,
      user_image: "",
      date_birth: this.date_birth,
      address: this.address,
      state: this.state,
      city: this.city,
      zip_code: this.zip_code,
      role: "user",
      disable: false,
      tokens: "",
      loginCount: 0
    };
console.log(newUser);

    this.userService.add(newUser).subscribe(() => {
      this.route.navigate(['/login']);
    });
  }
}
