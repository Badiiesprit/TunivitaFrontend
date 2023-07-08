import { Component } from '@angular/core';
import { Offer } from '../../../model/offer';
import { OfferService } from 'src/app/services/admin/offer/offer.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Image } from 'src/app/model/image';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  public offre:Offer;
  public baseurl = environment.url;
  public image:Image = new Image();
  public centreId:any;
  offers: any[] = [];



  constructor(private route:ActivatedRoute ,private offreService: OfferService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.offreService.searsh(id).subscribe(
          (response) => {
            if (response) {
              this.offre = response;
              this.image = this.offre.image as Image;
              console.log(this.image.path);

              this.centreId = this.offre.center._id;
              this.offreService.getOffersByCenter(this.centreId).subscribe(
                (response) => {
                  this.offers = response.filter((offer: any) => offer._id !== id);
                  console.log(this.offers);
                },
                (error) => {
                  console.error('Error fetching services:', error);
                }
              );
            }
          }
        );
      }
    });

  }




  carouselConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };






  rateService(offerId: string, rating: number): void {
    this.offreService.rate(offerId, rating).subscribe(
      (response) => {
        const offerIndex = this.offers.findIndex((offers) => offers._id === offerId);
        if (offerIndex > -1) {
          this.offers[offerIndex].averageRating = response.averageRating;
        }
      },
      (error) => {
        console.error('Error rating service:', error);
      }
    );
  }



  }
