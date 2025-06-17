// forum-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Forum } from '../forum.model';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums: Forum[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedForum: Forum | null = null;

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.fetchForums();
  }

  fetchForums(): void {
    this.forumService.getAllForums().subscribe((data: Forum[]) => {
      this.forums = data;
    });
  }

  deleteForum(id: number | undefined): void {
    if (id !== undefined) {
      this.forumService.deleteForum(id).subscribe(() => {
        this.forums = this.forums.filter(forum => forum.idForum !== id);
      });
    } else {
      console.error('Forum ID not defined');
    }
  }

  editForum(forum: Forum): void {
    this.selectedForum = { ...forum }; // Cloner le forum pour éviter les effets de bord
  }

  updateForum(): void {
    if (this.selectedForum) {
      this.forumService.updateForum(this.selectedForum).subscribe(() => {
        this.selectedForum = null; // Réinitialiser le forum sélectionné après modification
        this.fetchForums(); // Recharger la liste des forums après modification
      });
    }
  }

  cancelEdit(): void {
    this.selectedForum = null; // Réinitialiser le forum sélectionné pour cacher le formulaire
  }

  get paginatedForums(): Forum[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.forums.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.forums.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
