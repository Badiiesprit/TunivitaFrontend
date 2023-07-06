import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  getToken(password:string, email:string): Observable<any> {
    return this.http.post<any>(`${this.url}login`,{password, email});
  }
}
