import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { MainCampeurComponent } from './main-campeur/main-campeur.component';
import { ModifyReservationComponent } from './modify-reservation/modify-reservation.component';
import { SidenavCampeurComponent } from './sidenav-campeur/sidenav-campeur.component';
import { MainResponsableComponent } from './main-responsable/main-responsable.component';
import { AddCentreComponent } from './add-centre/add-centre.component';
import { CentreCampingComponent } from './centre-camping/centre-camping.component';
import { HebergementComponent } from './hebergement/hebergement.component';
import { AffecterhebergementComponent } from './affecterhebergement/affecterhebergement.component';
import { EquipementComponent } from './equipement/equipement.component';
import { AddequipementComponent } from './addequipement/addequipement.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActFormComponent } from './act-form/act-form.component';
import { FeedAjoutComponent } from './feed-ajout/feed-ajout.component';
import { FeedbackAddComponent } from './feedback-add/feedback-add.component';
import { ForumAjoutComponent } from './forum-ajout/forum-ajout.component';
import { ListActComponent } from './list-act/list-act.component';
import { ListFeedbackComponent } from './list-feedback/list-feedback.component';
import { ListForComponent } from './list-for/list-for.component';
import { ListeRecComponent } from './liste-rec/liste-rec.component';
import { PiechartComponent } from './pie-chart/pie-chart.component';
import { ReclamationAddComponent } from './reclamation-add/reclamation-add.component';
import { ReclamationChartComponent } from './reclamation-chart/reclamation-chart.component';
import { ReclamationFormComponent } from './reclamation-form/reclamation-form.component';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';
import { ReponseFormComponent } from './reponse-form/reponse-form.component';
import { FeedListComponent } from './feedlist/feedlist.component';
import { ActiviteAddComponent } from './activite-add/activite-add.component';


const routes: Routes = [
  { path: 'reservation', component: ReservationComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'main', component: MainComponent },
  { path: 'profile', component: UtilisateurComponent },
  { path: '', component: SigninComponent },
  { path: 'addreservation', component: AddReservationComponent },
  { path: 'maincampeur', component: MainCampeurComponent },
  { path: 'mainresponsable', component: MainResponsableComponent },
  { path: 'editreservation/:id', component: ModifyReservationComponent },
  { path: 'sideresponsable', component: SidenavCampeurComponent },
  { path: 'centre', component: AddCentreComponent },
  { path: 'listcentres', component: CentreCampingComponent },
  { path: 'hebergement/:centreId', component: HebergementComponent },
  { path: 'addhebergement/:centreId', component: AffecterhebergementComponent },
  { path: 'hebergement', component: HebergementComponent },
  { path: 'equipements/:centreId', component: EquipementComponent },
  { path: 'addequipement/:centreId', component: AddequipementComponent },
  { path: 'reservations/:centreId', component: ReservationListComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reclamationAdd', component: ReclamationAddComponent },
  { path: 'reclamations', component: ReclamationListComponent },
  { path: 'listeRec', component: ListeRecComponent },
  { path: 'reclamation-add', component: ReclamationFormComponent },
  { path: 'pieChart', component: PiechartComponent },
  { path: 'reclamation-chart', component: ReclamationChartComponent },
  { path: 'reponse', component: ReponseFormComponent },
  { path: 'reponse', component: ReponseFormComponent },
  { path: 'activite', component: ActFormComponent },
  { path: 'activite-list/:centreId', component: ListActComponent },
  { path: 'forum', component: ListForComponent },
  { path: 'forum-add', component: ForumAjoutComponent },
  { path: 'feed/:centreId', component: FeedbackAddComponent },
  { path: 'add-feed', component: FeedAjoutComponent },
  { path: 'list-feed/:centreId', component: ListFeedbackComponent },
  { path: 'listfeed', component: FeedListComponent },
  { path: 'ajouteractivite/:centreId', component: ActiviteAddComponent },
  { path: 'activities/:centreId', component: ActFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
