import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/model/service';
import { ServiceService } from 'src/app/services/admin/service/service.service';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/services/admin/image/image.service';
import { Image } from 'src/app/model/image';
import { environment } from '../../../environments/environment';
import Chart, { ChartType } from 'chart.js/auto';
import { formatDate } from '@angular/common';

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
      const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = 1;

    this.startDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    this.endDate = today.toISOString().split('T')[0];

      this.serviceService.getStatistics(this.startDate, this.endDate).subscribe((data) => {
        this.createChart(data);
      });
    }


    createChart(data: any): void {
      const labels = data.statistics.map((statistic: any) => statistic.name);
      const clickCounts = data.statistics.map((statistic: any) => statistic.clickCount);
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Click Count',
              data: clickCounts,
              backgroundColor:  ' #BDD1F9',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  if (context.dataset) {
                    const dataPoint = context.dataset.data[context.dataIndex] || 0;
                    return `${label}: ${dataPoint}`;
                  }
                  return '';
                }
              },
              bodyFont: {
                size: 16
              }
            },
            legend: {
              display: false
            }
          }
        }
      });
    }


    getStatistics() {
      const formattedStartDate = formatDate(this.startDate, 'yyyy-MM-dd', 'en-US');
      const formattedEndDate = formatDate(this.endDate, 'yyyy-MM-dd', 'en-US');
      if (!this.startDate || !this.endDate) {
        // Check if both start and end dates are selected
        return;
      }
      this.serviceService.getStatistics(formattedStartDate,formattedEndDate).subscribe(
        (data) => {
          this.createChart(data);
        },
        (error) => {
          console.error('Error fetching statistics:', error);
        }
      );
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
