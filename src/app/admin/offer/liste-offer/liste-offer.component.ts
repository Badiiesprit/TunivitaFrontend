import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/model/offer';
import { OfferService } from 'src/app/services/admin/offer/offer.service';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/services/admin/image/image.service';
import { Image } from 'src/app/model/image';
import { environment } from '../../../environments/environment';
import { Center } from 'src/app/model/center';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-liste-offer',
  templateUrl: './liste-offer.component.html',
  styleUrls: ['./liste-offer.component.scss']
})

export class ListeOfferComponent implements OnInit {
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

    selectedService: Offer | null = null;
    showDetails:Boolean;
    public image:Image = new Image();
    public imageUrl: string;
    public baseurl = environment.url;
    startDate: string;
    endDate: string;
    statistics: any[];
    public center:Center = new Center();

  constructor(
    private offerService: OfferService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private imageService: ImageService,
 ) {}



    ngOnInit() {
      this.offerService.getAll().subscribe(
        (response) => {
          this.list = response.offers;

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
          console.error('Error fetching offers:', error);
        }
      );
      this.offerService.getStatistics().subscribe((data) => {
        this.createChart(data);
      });    }


      createChart(data: any): void {
        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        const myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Enabled Offers', 'Disabled Offers'],
            datasets: [
              {
                label: 'Offer Status',
                data: [data.enqbleOffers, data.disableOffers],
                backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }





    deleteService(offer: Offer) {
      const i = this.list.indexOf(offer);
      console.log("test");
      console.log(offer);
      console.log(offer._id);


      if (i !== -1) {
        this.offerService.delete(offer._id).subscribe(() => {
          this.list.splice(i, 1);
        }, (error) => {
          console.error(error);
        });
      }
    }


    toggleService(offer: Offer) {
      console.log(offer._id);
      this.http.get("http://localhost:5050/offers/enable-disable/"+offer._id).subscribe((response: any) => {
        if (response.disable !== undefined) {
          offer.disable = response.disable;
        }
      });
    }

  }
