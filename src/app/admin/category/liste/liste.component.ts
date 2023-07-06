import { Component } from '@angular/core';
import { CategoryService } from '../../../services/admin/category/category.service';
import { Category } from 'src/app/model/category';
import { freeSet } from '@coreui/icons';

@Component({
  selector: 'app-category-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent {

  icons = freeSet ;
  public categorys: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }
  ngOnInit() {

    this.categoryService.getAll().subscribe(
      (response) => {
        this.categorys = response.result as Category[];
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

  deleteCenter(centerId: any): void {
    this.categoryService.delete(centerId).subscribe((response) => {
        if (response.result) {
          this.categoryService.getAll().subscribe((response) => {
            if (response.result) {
              this.categorys = response.result as Category[];
            }
          });
        }
      });
  }

}
