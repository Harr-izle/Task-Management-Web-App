import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl:string = '../../assets/data/data.json';

  constructor(private http: HttpClient) { }

 fetchData():Observable<IBoard> {
   return this.http.get<IBoard>(this.apiUrl);
 }
  
}
