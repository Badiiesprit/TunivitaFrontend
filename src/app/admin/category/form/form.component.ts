import { Component, OnInit } from '@angular/core';
import { Category } from '../../../model/category';
import { CategoryService } from 'src/app/services/admin/category/category.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  icons = { freeSet };

  public thiscategory: Category = new Category();
  public selectedFile: File; // Variable pour stocker le fichier sélectionné
  public loading: boolean;
  public messageIsUnread: boolean = false; 
  public messageIsError: boolean = false;
  public messageText: string;
  public addform: boolean = true;
  public category_parent: Category[] = []; 

  constructor(private router: ActivatedRoute, private categoryService: CategoryService) { 
    this.loading = false;
    this.messageText = "";
    let category: Category = new Category();
    category.title = "Not parent";
    this.category_parent.push(category);
  }

  ngOnInit() {

    this.router.params.subscribe(params => {
      const id = params['id']; 
      if(id){
        this.categoryService.getById(id).subscribe(
          (response) => {
            if (response.result) {
              this.thiscategory = response.result;
              this.addform = false;
            }
          }
        );
      }
    });

    this.categoryService.getAll().subscribe(
      (response) => {
        if (response.result) {
          let array: Category[] = response.result as Category[];
          array.forEach((category) => {
            if(!category.parent){
              this.category_parent.push(category);
            }
          });
        }
      }
    );
  }
  submitForm() {
    this.loading = true;
    if(this.addform){
      this.categoryService.addCategory(this.thiscategory,this.selectedFile).subscribe(
      (response) => {
        this.loading = false;
        if(response && response.error){
          this.messageIsError  = true;
          this.messageIsUnread  = false;
          this.messageText = response.error;
        }else{
          this.messageIsUnread  = true;
          this.messageIsError  = false;
          this.messageText = "Add category successfully";
        }
        
      }
    )
    }else{
      this.categoryService.updateCategory(this.thiscategory,this.selectedFile).subscribe(
        (response) => {
          this.loading = false;
          if(response && response.error){
            this.messageIsError  = true;
            this.messageIsUnread  = false;
            this.messageText = response.error;
          }else{
            this.messageIsUnread  = true;
            this.messageIsError  = false;
            this.messageText = "Update category successfully.";
          }
          
        }
      )
    }
  }

  onFileSelected(event: any) {
    // Gérer la sélection d'un fichier
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile); // Afficher le fichier sélectionné dans la console (à adapter selon vos besoins)
    // Vous pouvez envoyer le fichier au serveur ici ou effectuer d'autres actions nécessaires
  }
}
