import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  signupError: string = '';
  showWelcomeMessage: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {  // Inject Router
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator()]],
      role: ['', Validators.required]
    });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;

      const hasNumber = /[0-9]/.test(value);
      const hasLetter = /[a-zA-Z]/.test(value);
      const isValid = value.length >= 8 && hasNumber && hasLetter;

      return !isValid ? { 'passwordInvalid': { value: control.value } } : null;
    };
  }

  signup() {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe(
      (response: any) => {
        console.log(response.message); // Handle success message
        if (response.token) {  
          this.signupError = ''; 
          this.showWelcomeMessage = true; 
          setTimeout(() => {
            this.showWelcomeMessage = false; // Hide welcome message after 5 seconds
            this.router.navigate(['/signin']); // Redirect to signin page
          }, 5000);
        } else {
          this.signupError = response.message || 'Error during signup'; // Handle error message from response
        }
      },
      (error: any) => {
        console.error(error); // Log error
        this.signupError = error.error?.message || 'Error during signup'; // Set error message
      }
    );
  }
}
