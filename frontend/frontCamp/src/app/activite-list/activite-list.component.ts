import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiviteService } from '../activite.service';
import { Activite } from '../activite.model';

@Component({
  selector: 'app-activite-list',
  templateUrl: './activite-list.component.html',
  styleUrls: ['./activite-list.component.css'],
})
export class ActiviteListComponent implements OnInit {
  activites: Activite[] = [];
  editMode: boolean = false;
  activiteToEdit: Activite | null = null;
  centreId: number = 0;

  constructor(
    private activiteService: ActiviteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const centreIdStr = this.route.snapshot.paramMap.get('centreId');
    if (centreIdStr !== null) {
      this.centreId = +centreIdStr;
      this.loadActivites();
    } else {
      console.error('centreId is null');
    }
  }

  loadActivites(): void {
    this.activiteService.getActivitesByCentreId(this.centreId).subscribe(
      (activites: Activite[]) => {
        this.activites = activites;
      },
      (error) => {
        console.error('An error occurred while loading activities:', error);
      }
    );
  }

  deleteActivite(id: number): void {
    this.activiteService.deleteActivite(id).subscribe(
      () => {
        this.activites = this.activites.filter(
          (activite) => activite.idActivite !== id
        );
      },
      (error) => {
        console.error('An error occurred while deleting the activity:', error);
      }
    );
  }

  editActivite(activite: Activite): void {
    this.editMode = true;
    this.activiteToEdit = { ...activite };
  }
  updateActivite(): void {
    if (this.activiteToEdit) {
      // Sauvegardez le centreId avant de modifier activiteToEdit
      const centreId = this.activiteToEdit.centreId;

      // Créez une copie de activiteToEdit pour éviter de modifier l'original directement
      const activiteToUpdate = { ...this.activiteToEdit };

     

      this.activiteService.modifyActivite(activiteToUpdate).subscribe(
        (updatedActivite: Activite) => {
          // Restaurez le centreId à updatedActivite
          updatedActivite.centreId = centreId;

          const index = this.activites.findIndex(
            (a) => a.idActivite === updatedActivite.idActivite
          );
          if (index !== -1) {
            this.activites[index] = updatedActivite;
          }
          this.editMode = false;
          this.activiteToEdit = null;
        },
        (error) => {
          console.error(
            'An error occurred while updating the activity:',
            error
          );
        }
      );
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.activiteToEdit = null;
  }

  get editNom(): string {
    return this.activiteToEdit?.nom ?? '';
  }

  set editNom(value: string) {
    if (this.activiteToEdit) {
      this.activiteToEdit.nom = value;
    }
  }

  get editTarif(): number {
    return this.activiteToEdit?.tarif ?? 0;
  }

  set editTarif(value: number) {
    if (this.activiteToEdit) {
      this.activiteToEdit.tarif = value;
    }
  }

  get editNbrPersonne(): number {
    return this.activiteToEdit?.nbrPersonne ?? 0;
  }

  set editNbrPersonne(value: number) {
    if (this.activiteToEdit) {
      this.activiteToEdit.nbrPersonne = value;
    }
  }

  get editDescription(): string {
    return this.activiteToEdit?.description ?? '';
  }

  set editDescription(value: string) {
    if (this.activiteToEdit) {
      this.activiteToEdit.description = value;
    }
  }
}
