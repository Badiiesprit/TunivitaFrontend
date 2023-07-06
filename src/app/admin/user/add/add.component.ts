import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/admin/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  user: User = new User();
  action:String;
  public selectedFile: File | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id=this.route.snapshot.params['id']
    this.user = new User()
    this.action="Ajout Article"
    if(id!=null){
      this.action="Mettre a jour"
      this.userService.search(id).subscribe(
        (response:User)=>{this.user=response}
      )
    }

  }

  submitForm() {
  if (this.user) {
    this.userService.add(this.user).subscribe(
      (response: User) => {
        console.log(response); // Optional: Log the response from the server
        console.log('New user created successfully');
        this.router.navigate(['/admin/user']);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  } else {
    console.error('Invalid user object');
  }
}
}
