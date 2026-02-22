import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resetpasswordmodal',
  templateUrl: './resetpasswordmodal.component.html',
  styleUrls: ['./resetpasswordmodal.component.css']
})
export class ResetpasswordmodalComponent {

  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private dialogRef: MatDialogRef<ResetpasswordmodalComponent>
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  async changePassword() {
    if (this.passwordForm.invalid) {
      alert("Please fill all fields correctly");
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match");
      return;
    }

    const user = await this.afAuth.currentUser;
    if (!user || !user.email) return alert('User not logged in');

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      // Ré-authentification
      await user.reauthenticateWithCredential(credential);

      // Mise à jour du mot de passe
      await user.updatePassword(newPassword);

      alert('Password updated successfully!');
      this.dialogRef.close(); // fermer le modal
    } catch (err: any) {
      console.error(err);
      alert('Error: ' + err.message);
    }
  }
}