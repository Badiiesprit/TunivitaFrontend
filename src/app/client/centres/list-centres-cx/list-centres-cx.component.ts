import { Component, OnInit } from '@angular/core';
import { Center } from 'src/app/model/center';
import { CenterService } from 'src/app/services/admin/center/center.service';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/services/admin/image/image.service';
import { Image } from 'src/app/model/image';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-centres-cx',
  templateUrl: './list-centres-cx.component.html',
  styleUrls: ['./list-centres-cx.component.scss']
})
export class ListCentresCxComponent {
  centers: any[] = [];
  public motcle: string;
  public baseurl = environment.url;
  filteredCenters: any[] = [];
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 8; // Number of items to display per page
  sortOrder: string = 'asc'; // Sort order for date sorting
  sort_direction:string= "up";


  constructor(
    private centerService: CenterService,
    private http: HttpClient,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.centerService.getAll().subscribe(
      (response) => {
        this.centers = response.result;
        this.filteredCenters = this.centers;
        console.log(this.centers);
        console.log(this.filteredCenters);
      },
      (error) => {
        console.error('Error fetching centers:', error);
      }
    );

  }

  search(): void {
    if (this.motcle) {
      this.filteredCenters = this.centers.filter(center =>
        center.name.toLowerCase().includes(this.motcle.toLowerCase()) ||
        center.description.toLowerCase().includes(this.motcle.toLowerCase()) ||
        center.location.toLowerCase().includes(this.motcle.toLowerCase())
      );
    } else {
      this.filteredCenters = this.centers;
    }
    this.currentPage = 1; // Reset current page to 1 after search
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCenters.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }




  sortCentersByDate(): void {
    let arrayToSort = this.centers;

    if (this.motcle) {
      arrayToSort = this.filteredCenters;
    }

    arrayToSort.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (this.sortOrder === 'asc') {
        this.sort_direction = "up";
        return dateA - dateB;
      } else {
        this.sort_direction = "down";
        return dateB - dateA;
      }
    });
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  getSortIconClass(): string {
    return this.sortOrder === 'asc' ? 'asc' : 'desc';
  }



}
