import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/model/service';
import { ServiceService } from 'src/app/services/admin/service/service.service';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/services/admin/image/image.service';
import { Image } from 'src/app/model/image';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-liste-service',
  templateUrl: './liste-service.component.html',
  styleUrls: ['./liste-service.component.scss']
})

export class ListeServiceComponent implements OnInit {
   list:any[] = [];
    motcle:string;
    totalPages: number = 0;
    currentPage: number = 1;
    searchName: string = '';
    searchDescription: string = '';
    searchLocation: string = '';
    searchDate: string = '';

    sortField: string = '';
    sortOrder: string = '';

    selectedService: Service | null = null;
    showDetails:Boolean;
    public image:Image = new Image();
    public imageUrl: string;
    public baseurl = environment.url;
    startDate: string;
    endDate: string;
    statistics: any[];

  constructor(
    private serviceService: ServiceService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private imageService: ImageService,
 ) {}



    ngOnInit() {
      const startDate = new Date(); // Set the desired start date
      const endDate = new Date();

      this.serviceService.getAll().subscribe(
        (response) => {
          this.list = response.services;
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
      // this.getServicesPage(this.currentPage);
    }

    getStatistics(): void {
      const startDate = '2023-07-07'; // Replace with your actual start date
      const endDate = '2023-07-30'; // Replace with your actual end date

      this.http.get<any>('http://localhost:5050/services/statistics', { params: { startDate,endDate } })
        .subscribe(
          response => {
            this.statistics = response.statistics;
          },
          error => {
            console.error('Error fetching statistics:', error);
          }
        );
    }






    showServiceDetails(service: Service) {
      this.selectedService = service;
      this.showDetails = true;
      console.log(service.image);


      this.imageService.searsh(service.image as string).subscribe((response: Image) => {
        console.log("Response", response);
        this.imageUrl=response.path;
      });
      console.log(this.imageUrl);
      const url="127.0.0.1:5050/"+this.imageUrl;
      console.log(url);
    }







    hideServiceDetails() {
      this.selectedService = null;
    }





    searchServices() {
      const searchData = {
        name: this.searchName,
        description: this.searchDescription,
        location: this.searchLocation,
        date: this.searchDate
      };

      this.http.post('http://localhost:5050/services/searchFilters', searchData).subscribe((response: any) => {
        this.list = response.services;
      });
    }

    sortServices() {
      const sortData = {
        field: this.sortField,
        order: this.sortOrder
      };

      this.http.post("http://localhost:5050/services/sort", sortData).subscribe((response: any) => {
        this.list = response.services;
      });
    }

    getServicesPage(page: number) {
      this.serviceService.getServicesPage(page).subscribe((response: any) => {
        this.list = response.services;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      });
    }


    deleteService(service: Service) {
      const i = this.list.indexOf(service);
      console.log("test");
      console.log(service);
      console.log(service._id);


      if (i !== -1) {
        this.serviceService.delete(service._id).subscribe(() => {
          this.list.splice(i, 1);
        }, (error) => {
          console.error(error);
        });
      }
    }


    toggleService(service: Service) {
      console.log(service._id);
      this.http.get("http://localhost:5050/services/enable-disable/"+service._id).subscribe((response: any) => {
        if (response.disable !== undefined) {
          service.disable = response.disable;
        }
      });
    }

  }
