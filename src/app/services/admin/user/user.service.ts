import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../model/user';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.url+'user/';
  public token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
  }

  add(user: User) {
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return this.http.post<User>(`${this.url}addUser`, formData);
  }

  delete(id: number) {
    return this.http.delete(this.url + id);
  }

  disableUser(userId: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.url}enable-disable/${userId}`;
    return this.http.get(url, { headers });  }


  get(): Observable<any[]> {
   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>(`${this.url}get`, { headers });
  }

// getById(userId:string){
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get<any[]>(`${this.url}get/${userId}`, { headers });

// }

getById(id:string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  return this.http.get<User []>(this.url+'get/'+id, { headers })
    .pipe(
      catchError((error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des services:', error);
        throw error;
      })
    );
}
  update(id:String, u: User) {
    console.log(id)
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  const formData = new FormData();
  Object.entries(u).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return this.http.post(this.url+`update/`+id, formData , { headers });
  }

  search(id:number){
    return this.http.get<User>(this.url+id)
  }
  getStatistics(){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(this.url + 'statistics', { headers }).pipe(
      catchError((error) => {
        console.error('Error updating statistics:', error);
        throw error;
      })
    );

  }
}
