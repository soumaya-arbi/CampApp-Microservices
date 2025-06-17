import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HebergementService } from '../hebergement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-affecterhebergement',
  templateUrl: './affecterhebergement.component.html',
  styleUrls: ['./affecterhebergement.component.css'],
})
export class AffecterhebergementComponent {
  centreId: number = 0;
  hebergement = {
    nom: '',
    capacite: 0,
    prix: 0,
    description: '',
  };

  constructor(
    private route: ActivatedRoute,
    private hebergementService: HebergementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('centreId');
    if (id !== null) {
      this.centreId = +id;
    } else {
      console.error('ID du centre est indéfini ou invalide');
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.hebergementService
      .createHebergement(this.centreId, this.hebergement)
      .subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Hébergement créé avec succès!',
          }).then(() => {
            this.router.navigate(['/some-path']); // Remplacez '/some-path' par le chemin souhaité
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Une erreur est survenue lors de la création de l'hébergement.",
          });
        }
      );
  }
  goBack(): void {
    this.router.navigate(['/hebergement']); // Remplacez '/votre-chemin' par le chemin réel
  }
}
