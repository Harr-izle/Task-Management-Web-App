import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { selectSelectedBoard } from '../../state/board.selectors';
import { IBoard } from '../../interfaces/board';
import { AddEditBoardFormComponent } from '../add-edit-board-form/add-edit-board-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AddEditBoardFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  selectedBoard$: Observable<IBoard | undefined>;
  isDropdownOpen = false;
  showEditForm = false;

  constructor(
    public themeService: ThemeService,
    private store: Store,
    private elementRef: ElementRef
  ) {
    this.selectedBoard$ = this.store.select(selectSelectedBoard);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  editBoard() {
    this.showEditForm = true;
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}