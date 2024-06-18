import { Component ,Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';
@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  @Input() currentFilter: 'all' | 'active' | 'completed' = 'all';
  constructor(private router: Router, private authService: AuthService) { }
  logout() {
    console.log("logout");
    localStorage.removeItem(this.authService.tokenKey);
    localStorage.removeItem(this.authService.usernameKey);
    this.router.navigate(['/sign-in']);
  }
  getTitle(): string {
    switch (this.currentFilter) {
      case 'all':
        return 'Dashboard';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      default:
        return 'Dashboard'; 
    }
  }

}
