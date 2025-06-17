import { Component, OnInit } from '@angular/core';
import { CentreService } from '../centre.service';
import { AuthService } from '../auth.service';
import { of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centre-camping',
  templateUrl: './centre-camping.component.html',
  styleUrls: ['./centre-camping.component.css'],
})
export class CentreCampingComponent implements OnInit {
  centresDeCamping: any[] = [];
  currentIndex = 0;

  constructor(
    private centreDeCampingService: CentreService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCentresDeCamping();
  }

  loadCentresDeCamping(): void {
    this.authService
      .getUserId()
      .pipe(
        switchMap((utilisateurId: number | null) => {
          if (utilisateurId === null) {
            return of([]);
          } else {
            return this.centreDeCampingService.getCentresDeCampingByUtilisateurId(
              utilisateurId
            );
          }
        })
      )
      .subscribe((data) => {
        this.centresDeCamping = data;
      });
  }

  nextSlide() {
    if (this.currentIndex < this.centresDeCamping.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.centresDeCamping.length - 1;
    }
  }

  goBack(): void {
    this.router.navigate(['/mainresponsable']); // remplacez '/home' par le chemin souhaité
  }

  // Méthode pour affecter l'hébergement
  affecterHebergement(centreId: number): void {
    if (centreId) {
      this.router.navigate(['/hebergement', centreId]);
    } else {
      console.error('ID du centre indéfini');
    }
  }
  affecterEquipement(centreId: number): void {
    if (centreId) {
      this.router.navigate(['/equipements', centreId]);
    } else {
      console.error('ID du centre indéfini');
    }
  }
  goToReservations(centreId: number): void {
    this.router.navigate(['/reservations', centreId]);
  }
  goToactivities(centreId: number): void {
    this.router.navigate(['/activities', centreId]);
  }
}
