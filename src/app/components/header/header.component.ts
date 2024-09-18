import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { selectSelectedBoard } from '../../state/board.selectors';
import { IBoard } from '../../interfaces/board';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  selectedBoard$: Observable<IBoard | null | undefined>;

  constructor(public themeService: ThemeService, private store: Store) {
    this.selectedBoard$ = this.store.select(selectSelectedBoard);
  }
}
