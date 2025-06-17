import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUser: any; // Déclarez loggedInUser de type any

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser(); // Récupérez l'utilisateur connecté
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  goToUserProfile(): void {
    this.router.navigate(['/profile']); // Assurez-vous que la route '/user' est configurée pour afficher le composant de profil utilisateur
  }

  confirmLogout(): void {
    const confirmed = window.confirm('Vous voulez vraiment vous déconnecter?');
    if (confirmed) {
      this.logout();
    }
  }
}
