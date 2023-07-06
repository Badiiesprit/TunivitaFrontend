import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Comment } from '../../../model/comment';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = environment.url + 'comments/';
  public token = localStorage.getItem('token');
  constructor(private http: HttpClient  ) {}



  delete(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.url+"delete/"+id,{ headers });
  }

  getAll(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get<Comment []>(this.url+"get",{ headers })
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur s\'est produite lors de la récupération des commentaires:', error);
          throw error;
        })
      );
  }
  searsh(id: string): Observable<Comment> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get<Comment>(this.url + 'get/' + id,{ headers }).pipe(
      tap((response: Comment) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error retrieving service:', error);
        throw error;
      })
    );
  }
}
