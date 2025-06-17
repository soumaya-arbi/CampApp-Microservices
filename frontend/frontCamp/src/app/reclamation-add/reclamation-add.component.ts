import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReclamationService } from '../reclamation.service';
import { AuthService } from '../auth.service';
import { Reclamation } from '../reclamation.model';

@Component({
  selector: 'app-reclamation-add',
  templateUrl:'./reclamation-add.component.html',
  styleUrls: ['./reclamation-add.component.css']
})
export class ReclamationAddComponent implements OnInit {
  reclamationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.reclamationForm = this.fb.group({
      sujet: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reclamationForm.valid) {
      const reclamation: Reclamation = this.reclamationForm.value;
      const user = this.authService.getLoggedInUser();

      if (user) {
        reclamation.user = { id: user.id! }; // Utiliser ReclamationUser pour l'utilisateur
        this.reclamationService.addReclamation(reclamation).subscribe(
          response => {
            console.log('Réclamation ajoutée avec succès', response);
            this.reclamationForm.reset();
            this.router.navigate(['/reclamations']);
          },
          error => {
            console.error('Erreur lors de l\'ajout de la réclamation', error);
            this.reclamationForm.reset();
          }
        );
      } else {
        console.error('Utilisateur non authentifié');
      }
    }
  }
}
