import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { User } from '../../../model/user';
import { environment } from 'src/app/environments/environment';
import { Image } from 'src/app/model/image';
import { UserService } from '../../../services/admin/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  userId: string;
  decodedToken: any | null;
  user: User = new User();
  public baseurl = environment.url;
  public image: Image = new Image();
  public selectedFile: File | null = null;

  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router) {}
  ngOnInit(): void {

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

  submitForm() {
    this.route.params.subscribe(params => {
      const id = this.userId;
      console.log(id);

      if (this.user && id) {
        if (this.selectedFile) {
          this.user.image = this.selectedFile;
        }
        this.userService.update(id, this.user).subscribe(
          () => {
            console.log(this.user);
            console.log('User updated successfully');
            this.router.navigate(['/profile']);
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        console.error('Invalid user object or user ID is undefined');
      }
    });
  }

  onFileSelected(event: any) {
    // Gérer la sélection d'un fichier
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile); // Afficher le fichier sélectionné dans la console (à adapter selon vos besoins)
    // Vous pouvez envoyer le fichier au serveur ici ou effectuer d'autres actions nécessaires
  }

}
