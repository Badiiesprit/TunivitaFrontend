import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/model/offer';
import { OfferService } from 'src/app/services/admin/offer/offer.service';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/services/admin/image/image.service';
import { Image } from 'src/app/model/image';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { TokenService } from 'src/app/services/token/token.service';
import { HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { User } from '../../../model/user';
import { UserService } from '../../../services/admin/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  offers: any[] = [];
  public motcle: string;
  public baseurl = environment.url;
  filteredOffers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  sortOrder: string = 'asc';
  sort_direction:string= "up";
  userId: string;
  decodedToken: any | null;
  user: User = new User();

  isShowingFavorites = false;

  constructor(
    private offerService: OfferService,
    private http: HttpClient,
    private imageService: ImageService,



  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwt_decode(token);
      console.log(this.decodedToken);
      this.userId = this.decodedToken.userId;
      console.log(this.userId);

    }





    this.offerService.getAll().subscribe(
      (response) => {
        this.offers = response.offers;
        this.filteredOffers = this.offers;

        this.offers.forEach((offer) => {
          offer.isFavorite = offer.favorites.includes(this.userId);
        });


        console.log(this.offers);
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  toggleFavoriteOffer(offerId: string): void {
    this.offerService.toggleFavorite(offerId).subscribe(
      (response) => {
        const offerIndex = this.filteredOffers.findIndex((offer) => offer._id === offerId);
        if (offerIndex > -1) {
          this.filteredOffers[offerIndex].isFavorite = !this.filteredOffers[offerIndex].isFavorite;
        }
      },
      (error) => {
        console.error('Error toggling favorite:', error);
      }
    );
  }

  showFavorites(): void {


    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = jwt_decode(token);
      console.log(this.decodedToken);
      this.userId = this.decodedToken.userId;
      console.log(this.userId);

    }
    if (this.isShowingFavorites) {
      this.filteredOffers = this.offers;
    } else {
      this.filteredOffers = this.offers.filter((offer) => offer.favorites.includes(this.userId));
    }
    this.isShowingFavorites = !this.isShowingFavorites;
  }




  rateService(offerId: string, rating: number): void {
    this.offerService.rate(offerId, rating).subscribe(
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


  search(): void {
    if (this.motcle) {
      this.filteredOffers = this.offers.filter(offer =>
        offer.name.toLowerCase().includes(this.motcle.toLowerCase()) ||
        offer.description.toLowerCase().includes(this.motcle.toLowerCase())
        // offer.location.toLowerCase().includes(this.motcle.toLowerCase())
      );
    } else {
      this.filteredOffers = this.offers;
    }
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOffers.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  sortServicesByRate(): void {
    let arrayToSort = this.offers;

    if (this.motcle) {
      arrayToSort = this.filteredOffers;
    }

    arrayToSort.sort((a, b) => {
      const rateA = a.averageRating;
      const rateB = b.averageRating;

      if (this.sortOrder === 'asc') {
        this.sort_direction = "up";
        return rateA - rateB;
      } else {
        this.sort_direction = "down";
        return rateB - rateA;
      }
    });
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  getSortIconClass(): string {
    return this.sortOrder === 'asc' ? 'asc' : 'desc';
  }


}
