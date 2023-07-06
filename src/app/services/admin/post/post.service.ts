import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Post } from '../../../model/post';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = environment.url + 'posts/';
  public token = localStorage.getItem('token');

  constructor(private http: HttpClient  ) {}


  add(PostData: Post ): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);


    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(PostData)) {
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

  delete(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get(this.url+"delete/"+id,{ headers });
  }

  getAll(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get<Post []>(this.url+"get", { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des posts:', error);
          throw error;
        })
      );
  }

  searsh(id: string): Observable<Post> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get<Post>(this.url + 'get/' + id, { headers }).pipe(
      tap((response: Post) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error retrieving service:', error);
        throw error;
      })
    );
  }

  update(post: Post): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    const formData: FormData = new FormData();

    for (const [key, value] of Object.entries(post)) {
      if (key === 'date') {
        formData.append(key, new Date(value).toISOString());
      } else {
        formData.append(key, value.toString());
      }
    }
    return this.http.post<any>(this.url + 'update/' + post._id, formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating service:', error);
        throw error;
      })
    );
  }


}
