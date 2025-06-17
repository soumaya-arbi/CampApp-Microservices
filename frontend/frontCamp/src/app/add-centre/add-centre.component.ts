import { Component } from '@angular/core';
import { CentreService } from '../centre.service';
import { CentreDeCamping } from '../Models/CentreDeCamping';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-centre',
  templateUrl: './add-centre.component.html',
  styleUrls: ['./add-centre.component.css'],
})
export class AddCentreComponent {
  centreDeCamping: CentreDeCamping = new CentreDeCamping();
  selectedFile: File | null = null;

  constructor(
    private centreService: CentreService,
    private authService: AuthService
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.centreDeCamping.image = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    this.authService.getUserId().subscribe((userId) => {
      if (userId) {
        this.centreService
          .createCentreDeCamping(this.centreDeCamping, userId)
          .subscribe(
            (response) => {
              console.log('Centre de camping créé avec succès :', response);
              // Réinitialiser le formulaire ou effectuer d'autres actions après la création réussie
            },
            (error) => {
              console.error(
                'Erreur lors de la création du centre de camping :',
                error
              );
              // Gérer les erreurs
            }
          );
      } else {
        console.error('Erreur: Utilisateur non connecté.');
        // Gérer les erreurs de l'utilisateur non connecté
      }
    });
  }
  
}
