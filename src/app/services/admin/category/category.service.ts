import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { Category } from 'src/app/model/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url: string= environment.url+'category/';

  public token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
  }


  getById(id:string): Observable<any> {
    return this.http.get<Category []>(this.url+'get/'+id)
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }
  getAll(): Observable<any> {
    return this.http.get<Category []>(this.url+'get')
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

  addCategory(category:Category,file:File): Observable<any> {
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const formData = new FormData();
    Object.entries(category).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if(file) formData.set("image", file);

    return this.http.post<Category []>(this.url+'add',formData, { headers })
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
    return this.http.delete<Category []>(this.url+'delete/'+id,{headers})
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }

  updateCategory(category:Category,file:File): Observable<any> {
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const formData = new FormData();
    Object.entries(category).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if(category.parent && category.parent._id){
      formData.set("parent", category?.parent?._id.toString());
    }
    if(file){
      formData.set("image", file);
    }

    return this.http.post<Category []>(this.url+'update/'+category._id,formData, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des services:', error);
          throw error;
        })
      );
  }



}
