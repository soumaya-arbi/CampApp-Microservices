import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipementService } from '../equipement.service';
import { Equipement } from '../Models/Equipement';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css'],
})
export class EquipementComponent implements OnInit {
  equipements: Equipement[] = [];
  centreId: number = 0; // Initialisation par défaut
  editIndex: number | null = null; // Index de l'élément en cours d'édition

  constructor(
    private route: ActivatedRoute,
    private equipementService: EquipementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const centreIdStr = this.route.snapshot.paramMap.get('centreId');
    if (centreIdStr !== null) {
      this.centreId = +centreIdStr;
      this.loadEquipements();
    } else {
      console.error('centreId is null');
    }
  }

  loadEquipements(): void {
    this.equipementService
      .getEquipementsByCentreId(this.centreId)
      .subscribe((data) => {
        this.equipements = data;
      });
  }

  goToCreateEquipement(): void {
    this.router.navigate(['/addequipement', this.centreId]);
  }

  onEdit(index: number): void {
    this.editIndex = index;
  }

  onSave(index: number): void {
    const equipement = this.equipements[index];
    this.equipementService
      .updateEquipement(equipement.idEquipement, equipement)
      .subscribe(() => {
        this.editIndex = null;
        this.loadEquipements(); // Recharger la liste après la sauvegarde
        // Afficher une alerte de succès
        Swal.fire({
          icon: 'success',
          title: 'Modification réussie',
          text: "L'équipement a été modifié avec succès.",
        });
      });
  }

  onDelete(idEquipement: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas annuler cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.equipementService.deleteEquipement(idEquipement).subscribe(() => {
          Swal.fire('Supprimé!', "L'équipement a été supprimé.", 'success');
          this.loadEquipements(); // Recharger la liste après la suppression
        });
      }
    });
  }
}
