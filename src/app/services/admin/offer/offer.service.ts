import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Offer } from '../../../model/offer';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  url = environment.url + 'offers/';
  private statisticsUrl = this.url+"statistics";
  public token = localStorage.getItem('token');

  constructor(private http: HttpClient  ) {}

  add(offerData: Offer ): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(offerData)) {
      if (key === 'date') {
        formData.append(key, new Date(value).toISOString());
      } else {
        formData.append(key, value);
      }
    }
    return this.http.post<any>(this.url+"add",formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding offer:', error);
        throw error;
      })
    );
  }

  delete(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get(this.url+"delete/"+id, { headers });
  }

  getAll(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Offer []>(this.url, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

  searsh(id: string): Observable<Offer> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Offer>(this.url + 'get/' + id, { headers }).pipe(
      tap((response: Offer) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error retrieving service:', error);
        throw error;
      })
    );
  }

  update(offer: Offer): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(offer)) {
      if (key === 'date') {
        formData.append(key, new Date(value).toISOString()); // Convert date to ISO string
      } else {
        formData.append(key, value.toString()); // Convert other values to string
      }
    }
    return this.http.post<any>(this.url + 'update/' + offer._id, formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating service:', error);
        throw error;
      })
    );
  }

  getServicesPage(page: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    const url = `${this.url}/page?page=${page}`;
    return this.http.get(url, { headers });
  }

  getStatistics(){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(this.url + 'statistics/', { headers }).pipe(
      catchError((error) => {
        console.error('Error updating statistics:', error);
        throw error;
      })
    );

  }


  rate(offerId: string, rating: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const body = {
      rating
    };

    return this.http.post<any>(`${this.url}rate/${offerId}`, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error rating service:', error);
        throw error;
      })
    );
  }

  getOffersByCenter(id: string): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      return this.http.get<any>(`${this.url}offers-by-center/${id}`, { headers })
        .pipe(
          catchError((error: any) => {
            console.error('Une erreur s\'est produite lors de la récupération des offres:', error);
            throw error;
          })
        );
    }

}
