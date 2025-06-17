import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HebergementService } from '../hebergement.service';
import { Hebergement } from '../Models/Hebergement';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hebergement',
  templateUrl: './hebergement.component.html',
  styleUrls: ['./hebergement.component.css'],
})
export class HebergementComponent implements OnInit {
  hebergements: Hebergement[] = [];
  centreId: number = 0;
  editIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private hebergementService: HebergementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const centreIdStr = this.route.snapshot.paramMap.get('centreId');
    if (centreIdStr !== null) {
      this.centreId = +centreIdStr;
      this.loadHebergements();
    } else {
      console.error('centreId is null');
    }
  }

  loadHebergements(): void {
    this.hebergementService
      .getHebergementsByCentreId(this.centreId)
      .subscribe((data) => {
        this.hebergements = data;
      });
  }

  goToCreateHebergement(): void {
    this.router.navigate(['/addhebergement', this.centreId]);
  }

  onEdit(index: number): void {
    this.editIndex = index;
  }

  onSave(index: number): void {
    const hebergement = this.hebergements[index];
    hebergement.centreId = this.centreId; // Assurez-vous que le centreId est bien assigné

    this.hebergementService
      .updateHebergement(hebergement.idHebergement, hebergement)
      .subscribe(() => {
        this.editIndex = null;
        this.loadHebergements(); // Recharger la liste après la sauvegarde
      });
  }

  onDelete(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas annuler cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hebergementService.deleteHebergement(id).subscribe(
          () => {
            this.loadHebergements(); // Recharger la liste après la suppression
            Swal.fire('Supprimé!', "L'hébergement a été supprimé.", 'success');
          },
          (error) => {
            console.error('Failed to delete hebergement:', error);
            Swal.fire('Erreur!', 'La suppression a échoué.', 'error');
          }
        );
      }
    });
  }
}
