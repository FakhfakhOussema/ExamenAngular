import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adventure-work';

  constructor(
      private AS: AuthService,
      private router: Router
    ) {}
  
  isLoginPage() {
    return this.router.url === '/login';
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
}
