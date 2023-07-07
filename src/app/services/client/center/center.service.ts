import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { Center } from 'src/app/model/center';
import { Category } from 'src/app/model/category';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  public token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<Center []>(environment.url+'center/getAll')
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

  getCategorys(): Observable<any> {
    return this.http.get<Category []>(environment.url+'category/get/')
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

}
