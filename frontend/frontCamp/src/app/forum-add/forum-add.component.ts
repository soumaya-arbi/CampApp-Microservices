import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForumService } from '../forum.service';
import { AuthService } from '../auth.service';
import { Forum } from '../forum.model';

import { User } from '../Models/user';

@Component({
  selector: 'app-forum-add',
  templateUrl: './forum-add.component.html',
  styleUrls: ['./forum-add.component.css']
})
export class ForumAddComponent implements OnInit {
  forumForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forumService: ForumService,
    private authService: AuthService,
    private router: Router
  ) {
    this.forumForm = this.fb.group({
      sujet: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.forumForm.valid) {
      const forum: Forum = this.forumForm.value;
      const user = this.authService.getLoggedInUser();

      if (user) {
        forum.user = { id: user.id! }; // Assign the user ID to the forum user
        this.forumService.addForum(forum).subscribe(
          response => {
            console.log('Forum ajouté avec succès', response);
            this.forumForm.reset();
            this.router.navigate(['/forums']);
          },
          error => {
            console.error('Erreur lors de l\'ajout du forum', error);
            this.forumForm.reset();
          }
        );
      } else {
        console.error('Utilisateur non authentifié');
      }
    }
  }
}
