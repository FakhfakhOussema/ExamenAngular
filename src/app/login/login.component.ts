import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {

    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Email and password required'
      });
      return;
    }

    const body = {
      email: this.email,
      password: this.password
    };

    this.authService.login(body).pipe(
      switchMap((res: any) => {
        if (res?.token) {
          this.authService.saveToken(res.token);
          return this.authService.loadUserRole();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Login response invalid'
          });
          return of(null);
        }
      })
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          showConfirmButton: false,
          timer: 1000
        });

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1200);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Login failed'
        });
      }
    });
  }


goToSignup() {
  this.router.navigate(['/signup']);
}
}