import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipement } from '../Models/Equipement';
import { EquipementService } from '../equipement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addequipement',
  templateUrl: './addequipement.component.html',
  styleUrls: ['./addequipement.component.css'],
})
export class AddequipementComponent implements OnInit {
  centreId!: number;
  equipement: Equipement = {
    idEquipement: 0,
    centreId: 0,
    nom: '',
    prix: 0,
    description: '',
  };

  constructor(
    private route: ActivatedRoute,
    private equipementService: EquipementService
  ) {}

  ngOnInit(): void {
    const centreIdParam = this.route.snapshot.paramMap.get('centreId');
    if (centreIdParam !== null) {
      this.centreId = +centreIdParam;
    }
  }

  onSubmit() {
    this.equipement.centreId = this.centreId;
    this.equipementService
      .addEquipement(this.equipement, this.centreId)
      .subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Équipement ajouté avec succès',
            showConfirmButton: false,
            timer: 1500, // Durée en millisecondes avant de fermer automatiquement la boîte de dialogue
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: "Erreur lors de l'ajout de l'équipement",
            text: error.message, // Afficher un message d'erreur détaillé
          });
        }
      );
  }
}
