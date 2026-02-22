import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private AS: AuthService,
    private router: Router
  ) {}

  signup() {

    if (this.password !== this.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    this.AS.signUpWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        console.error('Erreur inscription:', err);
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}