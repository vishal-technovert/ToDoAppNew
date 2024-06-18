import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  username: string = '';
  password: string = '';
  passwordFieldType: 'password' | 'text' = 'password';

  constructor(private authService: AuthService, private router: Router) { }

  signIn() {
    this.authService.login(this.username, this.password).subscribe(response => {
      if (response) {
        console.log("Successs");
        this.router.navigate(['/dashboard']);
      } else {
        console.log("Failed");
        alert('Login failed');
      }
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

}
