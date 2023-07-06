import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { tap } from 'rxjs/operators';
import { Image } from '../../../model/image';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url = environment.url + 'image/';
  constructor(private http: HttpClient  ) {}



  search(id: Object): Observable<Image> {
    return this.http.get<Image>(this.url + 'get/' + id).pipe(
      tap((response: Image) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error retrieving image:', error);
        throw error;
      })
    );
  }


  searsh(id: string) {
    return this.http.get<Image>(this.url + 'getPath/'+ id);
  }
}
