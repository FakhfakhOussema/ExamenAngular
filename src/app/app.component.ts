import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';

  constructor(
      private AS: AuthService,
      private router: Router
    ) {}
  
  isLoginPage() {
    return this.router.url === '/login' || this.router.url === '/signup';
  }
  logout() {
    this.AS.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error('Erreur de déconnexion:', err);
      });
  }
  profil() {
    this.router.navigate(['/profil']);
  }
}
