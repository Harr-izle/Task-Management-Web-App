import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme: string = 'light';

  setTheme(theme: string) {
    this.currentTheme = theme;
    this.updateTheme();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.updateTheme();
  }

  private updateTheme() {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(this.currentTheme);
  }
}