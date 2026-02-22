import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { ResetpasswordmodalComponent } from './resetpasswordmodal/resetpasswordmodal.component';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userName: string = '';
  userEmail: string = '';

  constructor(
    private AS: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private dialog: MatDialog
  ) {}

  ngOnInit() {

    // écouter l'utilisateur connecté Firebase
    this.afAuth.authState.subscribe(user => {

      if (user && user.email) {

        this.userEmail = user.email;

        // username = partie avant @
        this.userName = user.email.split('@')[0];

        // option : première lettre majuscule
        this.userName =
          this.userName.charAt(0).toUpperCase() +
          this.userName.slice(1);
      }

    });

  }

  logout() {
    this.AS.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
  changePassword() {
    this.dialog.open(ResetpasswordmodalComponent, {
      width: '400px',
      data: { email: this.userEmail } 
    });
  }

}