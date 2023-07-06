import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/admin/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{
  public user: User;
  public selectedFile: File | null = null;

  constructor(private route: ActivatedRoute,private router: Router, private userService: UserService) {}
ngOnInit() {
  this.route.params.subscribe(params => {
    const userId = params['id'];
    // Use the userId value as needed
    console.log(userId);
    this.userService.getById(userId).subscribe(
      (data) => {
        this.user = data.result;
        this.user.password = "";
        console.log(data);

      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  });
}
submitForm() {
  this.route.params.subscribe(params =>{
    const userId = params['id'];
    if (this.user && userId) {
      if(this.selectedFile)
      {
        this.user.user_image = this.selectedFile;
      }
      this.userService.update(userId, this.user).subscribe(
        () => {
          console.log(this.user);
          console.log('you are here');
          console.log('User updated successfully');
          this.router.navigate(['/admin/user']);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('Invalid user object or user ID is undefined');
    }

  })

}

onFileSelected(event: any) {
  // Gérer la sélection d'un fichier
  this.selectedFile = event.target.files[0];
  console.log(this.selectedFile); // Afficher le fichier sélectionné dans la console (à adapter selon vos besoins)
  // Vous pouvez envoyer le fichier au serveur ici ou effectuer d'autres actions nécessaires
}

}
