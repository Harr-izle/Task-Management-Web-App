import { ApiService } from './services/api.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Task-Management-Web-App';
  constructor(private apiService:ApiService){}


  ngOnInit(){
    this.apiService.getBoards().subscribe(res=>console.log(res))
  }
}
