import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReservationComponent } from './reservation/reservation.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CentreCampingComponent } from './centre-camping/centre-camping.component';
import { ReservationService } from './reservation/reservation.service';
import { Reservation } from './Models/reservation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ModifyReservationComponent } from './modify-reservation/modify-reservation.component'; // Ensure correct path to Reservation model
import { MatDialogModule } from '@angular/material/dialog';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainResponsableComponent } from './main-responsable/main-responsable.component';
import { SidenavResponsableComponent } from './sidenav-responsable/sidenav-responsable.component';
import { MainCampeurComponent } from './main-campeur/main-campeur.component';
import { SidenavCampeurComponent } from './sidenav-campeur/sidenav-campeur.component';
import { AddCentreComponent } from './add-centre/add-centre.component';
import { HebergementComponent } from './hebergement/hebergement.component';
import { AffecterhebergementComponent } from './affecterhebergement/affecterhebergement.component';
import { EquipementComponent } from './equipement/equipement.component';
import { AddequipementComponent } from './addequipement/addequipement.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReponseFormComponent } from './reponse-form/reponse-form.component';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';
import { ListeRecComponent } from './liste-rec/liste-rec.component';
import { ReclamationFormComponent } from './reclamation-form/reclamation-form.component';
import { PiechartComponent } from './pie-chart/pie-chart.component';
import { ReclamationChartComponent } from './reclamation-chart/reclamation-chart.component';
import { ReclamationAddComponent } from './reclamation-add/reclamation-add.component';
import { ReponseAddComponent } from './reponse-add/reponse-add.component';
import { ActiviteAddComponent } from './activite-add/activite-add.component';
import { ActFormComponent } from './act-form/act-form.component';
import { ActiviteListComponent } from './activite-list/activite-list.component';
import { ListActComponent } from './list-act/list-act.component';
import { ForumListComponent } from './forum-list/forum-list.component';
import { ForumAddComponent } from './forum-add/forum-add.component';
import { ListForComponent } from './list-for/list-for.component';
import { ForumAjoutComponent } from './forum-ajout/forum-ajout.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FeedAjoutComponent } from './feed-ajout/feed-ajout.component';
import { FeedbackAddComponent } from './feedback-add/feedback-add.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { ListFeedbackComponent } from './list-feedback/list-feedback.component';
import { FeedListComponent } from './feedlist/feedlist.component';
import { ActivitiesComponent } from './activities/activities.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    MainComponent,
    ReservationComponent,
    UtilisateurComponent,
    CentreCampingComponent,
    AddReservationComponent,
    ModifyReservationComponent,
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    MainComponent,
    ReservationComponent,
    UtilisateurComponent,
    CentreCampingComponent,
    SigninComponent,
    SignupComponent,
    MainResponsableComponent,
    SidenavResponsableComponent,
    MainCampeurComponent,
    SidenavCampeurComponent,
    AddCentreComponent,
    HebergementComponent,
    AffecterhebergementComponent,
    EquipementComponent,
    AddequipementComponent,
    ReservationListComponent,
    ResetPasswordComponent,
    ReponseFormComponent,
    ReclamationAddComponent,
    ReclamationListComponent,
    ListeRecComponent,
    ReclamationFormComponent,
    PiechartComponent,
    ReclamationChartComponent,
    ReponseAddComponent,
    ReponseFormComponent,
    ActiviteAddComponent,
    ActFormComponent,
    ActiviteListComponent,
    ListActComponent,
    ForumListComponent,
    ForumAddComponent,
    ListForComponent,
    ForumAjoutComponent,
    StarRatingComponent,
    FeedbackAddComponent,
    FeedAjoutComponent,
    FeedbackListComponent,
    ListFeedbackComponent,
    FeedListComponent,
    ActivitiesComponent
  ],
  providers: [ReservationService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
})
export class AppModule {}




