import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  modifform: FormGroup; // Déclarez le formulaire ici
  loggedInUser: any;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loggedInUser = this.authService.getLoggedInUser(); // Récupérez l'utilisateur connecté ici

    // Charger les données sauvegardées localement s'il y en a
    const savedUserData = JSON.parse(localStorage.getItem('userData') || '{}');

    this.modifform = this.fb.group({
      firstName: [savedUserData.firstName || this.loggedInUser.firstName, Validators.required],
      lastName: [savedUserData.lastName || this.loggedInUser.lastName, Validators.required],
      username: [savedUserData.username || this.loggedInUser.username, Validators.required],
      password: [savedUserData.password || this.loggedInUser.password, [Validators.required, this.passwordValidator]]
    });
  }

  ngOnInit(): void {}

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      if (!password || password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return { passwordInvalid: true };
      }
      return null;
    };
  }

  updateUserProfile(): void {
    if (this.modifform.invalid) {
      return;
    }

    const updatedUser = {
      id: this.loggedInUser.id,
      firstName: this.modifform.get('firstName')?.value,
      lastName: this.modifform.get('lastName')?.value,
      username: this.modifform.get('username')?.value,
      password: this.modifform.get('password')?.value,
      role: this.loggedInUser.role
    };

    this.authService.updateUserProfile(updatedUser).subscribe(
      response => {
        if (response.message === 'Username already exists') {
          this.errorMessage = response.message;
          this.successMessage = null;
        } else {
          this.successMessage = 'Profil mis à jour avec succès';
          this.errorMessage = null;
          console.log('Profil mis à jour avec succès', response);

          // Sauvegarder les nouvelles données localement
          localStorage.setItem('userData', JSON.stringify(updatedUser));
        }
        this.clearMessagesAfterDelay();
      },
      error => {
        this.errorMessage = 'Erreur lors de la mise à jour du profil: ' + (error.error?.message || error.message || 'Erreur inconnue');
        this.successMessage = null;
        console.error('Erreur lors de la mise à jour du profil', error);
        this.clearMessagesAfterDelay();
      }
    );
  }

  clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }

  clearMessagesAfterDelay(): void {
    setTimeout(() => {
      this.clearMessages();
    }, 5000); // Effacer après 5 secondes
  }
}
