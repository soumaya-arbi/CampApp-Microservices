import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiviteService } from '../activite.service';
import { AuthService } from '../auth.service';
import { Activite } from '../activite.model';

@Component({
  selector: 'app-activite-add',
  templateUrl:'./activite-add.component.html',
  styleUrls: ['./activite-add.component.css']
})
export class ActiviteAddComponent implements OnInit {
  activiteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activiteService: ActiviteService,
    private authService: AuthService,
    private router: Router
  ) {
    this.activiteForm = this.fb.group({
      nom: ['', Validators.required],
      tarif: ['', Validators.required],
      nbrPersonne: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {}
addact(): void { if (this.activiteForm.valid) {
  const activite: Activite = this.activiteForm.value;
  const user = this.authService.getLoggedInUser();

  if (user) {
    this.activiteService.addActivite(activite).subscribe(
      (response) => {
        console.log('Activité ajoutée avec succès', response);
        this.activiteForm.reset();
        this.router.navigate(['/activites']);
      },
      (error) => {
        console.error("Erreur lors de l'ajout de l'activité", error);
        this.activiteForm.reset();
      }
    );
  } else {
    console.error('Utilisateur non authentifié');
  }
}}
  
}
