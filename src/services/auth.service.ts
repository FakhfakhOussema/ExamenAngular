import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
     
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  canActivate() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) return true;     
        this.router.navigate(['/login']); 
        return false;
      })
    );
  }

  resetPassword(email: string){
    return this.afAuth.sendPasswordResetEmail(email);
  }
}

