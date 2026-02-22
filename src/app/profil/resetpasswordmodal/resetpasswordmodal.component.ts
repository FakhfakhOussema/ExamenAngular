import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

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
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill all fields correctly',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'New password and confirmation do not match',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    const user = await this.afAuth.currentUser;
    if (!user || !user.email) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'User not logged in',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPassword);

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Password updated successfully!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });

      this.dialogRef.close(); // fermer le modal
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true
      });
    }
  }
}