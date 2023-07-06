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
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Center []>(this.url+'getAll',{headers})
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

  getTopVus(): Observable<any> {
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Center []>(this.url+'gettopvus/3',{headers})
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

  delete(id:string): Observable<any> {
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<Center []>(this.url+'delete/'+id,{headers})
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

  getById(id:string): Observable<any> {
    return this.http.get<Center []>(this.url+'get/'+id)
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

  add(center:Center,file:FileList): Observable<any> {
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const formData = new FormData();
    // Ajouter les propriétés du centre à formData
    Object.entries(center).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Ajouter les fichiers d'images à formData
    if (file && file.length > 0) {
      const filesArray: File[] = Array.from(file);
      filesArray.forEach((image: File, index: number) => {
        formData.append('image', image, `image${index}`);
      });
    }

    // Envoyer la requête HTTP avec les données FormData
    return this.http.post<Center []>(this.url+'add',formData, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

  

  update(center:Center,file:any): Observable<any> {
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const formData = new FormData();
    // Ajouter les propriétés du centre à formData
    Object.entries(center).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Ajouter les fichiers d'images à formData
    if (file && file.length > 0) {
      const filesArray: File[] = Array.from(file);
      filesArray.forEach((image: File, index: number) => {
        formData.append('image', image, `image${index}`);
      });
    }

    // Envoyer la requête HTTP avec les données FormData
    return this.http.post<Center []>(this.url+'update/'+center._id,formData, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error; 
        })
      );
  }

}
