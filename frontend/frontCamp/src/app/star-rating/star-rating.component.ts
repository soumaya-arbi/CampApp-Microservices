import { Component } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  rating: number = 0; // Initialisation directe de la propriété 'rating'

  constructor() {
    // Vous pouvez initialiser d'autres valeurs ou effectuer d'autres logiques dans le constructeur si nécessaire
  }

  // Fonction pour gérer le changement de note (à implémenter selon vos besoins)
  onRatingChanged(newRating: number) {
    this.rating = newRating;
    // Autres actions à effectuer en fonction du changement de note
  }
}
