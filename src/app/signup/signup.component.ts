import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'User';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signup() {

    if (!this.username || !this.email || !this.password) {

      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Tous les champs sont obligatoires'
      });

      return;
    }

    if (this.password !== this.confirmPassword) {

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les mots de passe ne correspondent pas'
      });

      return;
    }

    const body = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: "User"
    };

    this.authService.register(body).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);

      },

      error: () => {

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur inscription'
        });

      }

    });

  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}