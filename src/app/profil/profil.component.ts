import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  userRole: string = '';

  constructor(
    private AS: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.AS.getProfile().subscribe({
      next: (res: any) => {
        this.userName = res.username;
        this.userEmail = res.email;
        this.userRole = res.role;
      },
    });
  }

  logout() {
    this.AS.signOut();
    this.router.navigate(['/login']);
  }

  changePassword() {
    this.dialog.open(ResetpasswordmodalComponent, {
      width: '400px',
      data: { email: this.userEmail }
    });
  }
}