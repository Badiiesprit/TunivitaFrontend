import { Component } from '@angular/core';
import { CenterService } from '../../../services/admin/center/center.service';
import { Center } from 'src/app/model/center';
import { Category } from 'src/app/model/category';
import { freeSet } from '@coreui/icons';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent {
  public centers: Center[] = [];
  icons = freeSet ;
  constructor(private centerService: CenterService) {}

  ngOnInit() {

  this.centerService.getAll().subscribe(
    (response) => {
      this.centers = response.result as Center[];
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
    this.centerService.delete(centerId).subscribe((response) => {
        if (response.result) {
          this.centerService.getAll().subscribe((response) => {
            if (response.result) {
              this.centers = response.result as Center[];
            }
          });
        }
      });
  }
}

