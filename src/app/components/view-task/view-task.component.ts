import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent {
  isDropdownOpen = false;
  isOpen = false;
  selectedOption = '';
  options = ['Todo', 'Done','Doing'];
  

  constructor(private elementRef: ElementRef){

  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  toggleDown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }


}
