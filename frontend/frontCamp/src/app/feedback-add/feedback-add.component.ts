import { Component } from '@angular/core';
import { Feedback } from '../feedback.model';
import { FeedbackService } from '../feedbacks.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
  styleUrls: ['./feedback-add.component.css'],
})
export class FeedbackAddComponent {
  centreId: number = 0;
  newFeedback: Feedback = {
    commentaire: '',
    note: 1,
    centreId: 0,

    // Par défaut, la note commence à 1
  };

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const centreIdParam = this.route.snapshot.paramMap.get('centreId');
    if (centreIdParam !== null) {
      this.centreId = +centreIdParam;
    }
  }
  addFeedback() {
    this.feedbackService.addFeedback(this.newFeedback, this.centreId).subscribe(
      (response) => {
        console.log('Feedback ajouté avec succès:', response);
        // Réinitialiser le formulaire après succès
        this.newFeedback = {
          commentaire: '',
          note: 0,
          centreId: this.centreId, // Reset with the current centreId
        };
      },
      (error) => {
        console.error("Erreur lors de l'ajout du feedback:", error);
        // Gérer l'erreur ici (affichage d'un message d'erreur, etc.)
      }
    );
  }

  setRating(rating: number) {
    this.newFeedback.note = rating;
  }
}
