import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  resetError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.resetError = 'Passwords do not match';
      return;
    }

    console.log('Sending data:', this.username, this.newPassword); // Debug

    this.authService.resetPassword(this.username, this.newPassword).subscribe(
      (response) => {
        console.log('Response received:', response); // Debug
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Password Reset Successful',
            text: 'Your password has been reset. You will be redirected to the login page.',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            this.router.navigate(['/signin']);
          });
        }
      },
      (error) => {
        console.log('Error received:', error); // Debug
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successful',
          text: 'Your password has been reset. You will be redirected to the login page.',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/signin']);
        });
      }
    );
  }
}
