import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/model/offer';
import { OfferService } from 'src/app/services/admin/offer/offer.service';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/services/admin/image/image.service';
import { Image } from 'src/app/model/image';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

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


  constructor(
    private offerService: OfferService,
    private http: HttpClient,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.offerService.getAll().subscribe(
      (response) => {
        this.offers = response.offers;
        this.filteredOffers = this.offers;
        console.log(this.offers);
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );
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
        offer.description.toLowerCase().includes(this.motcle.toLowerCase()) ||
        offer.location.toLowerCase().includes(this.motcle.toLowerCase())
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




  sortServicesByDate(): void {
    let arrayToSort = this.offers;

    if (this.motcle) {
      arrayToSort = this.filteredOffers;
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
