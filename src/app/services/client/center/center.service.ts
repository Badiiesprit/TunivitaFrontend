import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { Center } from 'src/app/model/center';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  public url: string= environment.url+'center/';
  public token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Center []>(this.url+'getAll',{headers})
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

}
