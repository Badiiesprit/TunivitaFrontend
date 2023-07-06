import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Service } from '../../../model/service';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = environment.url + 'services/';
  private statisticsUrl = this.url+"statistics";
  public token = localStorage.getItem('token');

  constructor(private http: HttpClient  ) {}



  add(serviceData: Service ): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(serviceData)) {
      if (key === 'date') {
        formData.append(key, new Date(value).toISOString()); // Convert date to ISO string
      } else {
        formData.append(key, value); // Convert other values to string
      }
    }


    return this.http.post<any>(this.url+"add",formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding service:', error);
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

    return this.http.get<Service []>(this.url, { headers })
      .pipe(
        catchError((error: any) => {
          // Gérer l'erreur ici, par exemple, afficher un message d'erreur ou effectuer une autre action appropriée.
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error; // Lancer une exception pour interrompre le flux d'exécution si nécessaire.
        })
      );
  }

  searsh(id: number): Observable<Service> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get<Service>(this.url + 'get/' + id, { headers }).pipe(
      tap((response: Service) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error retrieving service:', error);
        throw error;
      })
    );
  }

  update(service: Service): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const formData: FormData = new FormData();

    for (const [key, value] of Object.entries(service)) {
      if (key === 'date') {
        formData.append(key, new Date(value).toISOString()); // Convert date to ISO string
      } else {
        formData.append(key, value.toString()); // Convert other values to string
      }
    }

    return this.http.post<any>(this.url + 'update/' + service._id, formData, { headers }).pipe(
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

}
