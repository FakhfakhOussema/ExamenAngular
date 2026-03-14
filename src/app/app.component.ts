import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'test';

  constructor(
    private AS: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.AS.isAuthenticated()) {
      this.AS.loadUserRole();
    }
  }

  isLoginPage() {
    return this.router.url === '/login' || this.router.url === '/signup';
  }


  logout() {
    this.AS.signOut();
    this.router.navigate(['/login']);
  }


  profil() {
    this.router.navigate(['/profil']);
  }
}