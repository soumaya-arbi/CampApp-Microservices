import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReponseService } from '../reponse.service';
import { ReclamationService } from '../reclamation.service';
import { AuthService } from '../auth.service';
import { Reponse } from '../reponse.model';
import { Reclamation } from '../reclamation.model';
import { User } from '../Models/user';

@Component({
  selector: 'app-reponse-add',
  templateUrl: './reponse-add.component.html',
  styleUrls: ['./reponse-add.component.css']
})
export class ReponseAddComponent implements OnInit {
  reponseForm: FormGroup;
  reclamations: Reclamation[] = [];
  selectedReclamation?: Reclamation;
  showReplyForm = false;

  constructor(
    private fb: FormBuilder,
    private reponseService: ReponseService,
    private reclamationService: ReclamationService,
    private authService: AuthService
  ) {
    this.reponseForm = this.fb.group({
      contenu: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.reclamationService.getAllReclamations().subscribe((data: Reclamation[]) => {
      this.reclamations = data;
    });
  }

  replyToReclamation(reclamation: Reclamation): void {
    this.selectedReclamation = reclamation;
    this.showReplyForm = true;
  }

  submitReply(): void {
    if (this.reponseForm.valid && this.selectedReclamation) {
      const loggedInUser = this.authService.getLoggedInUser();
      if (!loggedInUser) {
        console.error('Utilisateur non authentifié');
        return;
      }
  
      const reponse: Reponse = {
        contenu: this.reponseForm.value.contenu,
        user: { id: loggedInUser.id },
        reclamation: { idReclamation: this.selectedReclamation.idReclamation }
      };
  
      console.log('Envoi de la réponse:', reponse);
  
      this.reponseService.addReponse(reponse).subscribe(
        response => {
          console.log('Réponse ajoutée avec succès', response);
          this.reponseForm.reset();
          this.showReplyForm = false;
        },
        error => {
          console.error('Erreur lors de l\'ajout de la réponse', error);
          this.reponseForm.reset();
        }
      );
    } else {
      console.error('Formulaire invalide ou réclamation non sélectionnée');
    }
  }

  closeReplyForm(): void {
    this.showReplyForm = false;
  }
}
