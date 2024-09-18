import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = '../../assets/data/data.json';

  constructor(private http: HttpClient) { }

  getBoards() {
    // return this.http.get<IBoard[]>(this.apiUrl);
    return this.http.get<{boards: IBoard[]}>(this.apiUrl);
  }

  addBoard(board: IBoard): Observable<IBoard> {
    return this.http.post<IBoard>(this.apiUrl, board);
  }

  updateBoard(board: IBoard): Observable<IBoard> {
    return this.http.put<IBoard>(`${this.apiUrl}/${board.id}`, board);
  }

  deleteBoard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
