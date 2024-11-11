import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchTerm } });
    }
  }
}
