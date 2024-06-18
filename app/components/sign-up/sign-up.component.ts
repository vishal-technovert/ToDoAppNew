import { Component } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  
  signUp() {
    this.authService.signUp(this.username, this.password).subscribe(response => {
      if (response) {
        console.log("Sign Up Success");
        this.router.navigate(['/dashboard']);
      } else {
        console.log("Sign Up Failed");
        alert('Sign Up failed: User already exists');
      }
    });
  }
  
}
