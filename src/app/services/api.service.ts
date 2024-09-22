import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { IBoard } from '../interfaces/board';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private jsonUrl = '../../assets/data/data.json'; 
  private storageKey = 'kanban-boards';

  constructor(private http: HttpClient) { }

  private getStoredBoards(): IBoard[] {
    const storedBoards = localStorage.getItem(this.storageKey);
    return storedBoards ? JSON.parse(storedBoards) : [];
  }

  private saveBoards(boards: IBoard[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(boards));
  }

  getBoards(): Observable<{ boards: IBoard[] }> {
    const storedBoards = this.getStoredBoards();
    if (storedBoards.length > 0) {
      console.log('Retrieved boards from localStorage:', storedBoards);
      return of({ boards: storedBoards });
    } else {
      return this.http.get<{ boards: IBoard[] }>(this.jsonUrl).pipe(
        tap(response => console.log('Retrieved boards from JSON:', response.boards)),
        map(response => ({
          boards: response.boards.map(board => ({
            ...board,
            id: board.id || uuidv4()
          }))
        })),
        tap(response => this.saveBoards(response.boards)),
        catchError(error => {
          console.error('Error loading boards:', error);
          return of({ boards: [] });
        })
      );
    }
  }

  addBoard(board: IBoard): Observable<IBoard> {
    const boards = this.getStoredBoards();
    const newBoard = { ...board, id: uuidv4() };
    boards.push(newBoard);
    this.saveBoards(boards);
    console.log('Added new board:', newBoard);
    return of(newBoard);
  }

  updateBoard(updatedBoard: Partial<IBoard> & { id: string }): Observable<IBoard> {
    const boards = this.getStoredBoards();
    const index = boards.findIndex(b => b.id === updatedBoard.id);
    if (index !== -1) {
      boards[index] = { ...boards[index], ...updatedBoard };
      this.saveBoards(boards);
      console.log('Updated board:', boards[index]);
      return of(boards[index]);
    }
    return of(null as any); // Consider throwing an error or returning a more appropriate value
  }

  deleteBoard(id: string): Observable<void> {
    const boards = this.getStoredBoards();
    const updatedBoards = boards.filter(b => b.id !== id);
    this.saveBoards(updatedBoards);
    console.log('Deleted board with id:', id);
    return of(void 0);
  }
}