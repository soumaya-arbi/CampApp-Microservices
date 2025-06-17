// reclamation-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../reclamation.service';
import { Reclamation } from '../reclamation.model';

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.css']
})
export class ReclamationListComponent implements OnInit {
  reclamations: Reclamation[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedReclamation: Reclamation | null = null;
  searchYear: number | null = null;

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.fetchReclamations();
  }

  fetchReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe((data: Reclamation[]) => {
      this.reclamations = data;
    });
  }

  deleteReclamation(id: number | undefined): void {
    if (id !== undefined) {
      this.reclamationService.deleteReclamation(id).subscribe(() => {
        this.reclamations = this.reclamations.filter(reclamation => reclamation.idReclamation !== id);
      });
    } else {
      console.error('ID de réclamation non défini');
    }
  }

  editReclamation(reclamation: Reclamation): void {
    this.selectedReclamation = { ...reclamation }; // Cloner la réclamation pour éviter les effets de bord
  }

  updateReclamation(): void {
    if (this.selectedReclamation) {
      this.reclamationService.updateReclamation(this.selectedReclamation).subscribe(() => {
        this.selectedReclamation = null; // Réinitialiser la réclamation sélectionnée après modification
        this.fetchReclamations(); // Recharger la liste des réclamations après modification
      });
    }
  }

  cancelEdit(): void {
    this.selectedReclamation = null; // Réinitialiser la réclamation sélectionnée pour cacher le formulaire
  }

  get paginatedReclamations(): Reclamation[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.reclamations.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.reclamations.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  searchReclamationsByYear(): void {
    if (this.searchYear !== null) {
      this.reclamationService.getReclamationsByYear(this.searchYear)
        .subscribe(reclamations => {
          this.reclamations = reclamations;
        });
    }
  }
}
