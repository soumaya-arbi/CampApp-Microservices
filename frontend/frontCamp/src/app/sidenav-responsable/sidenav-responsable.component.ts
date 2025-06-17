import { Component } from '@angular/core';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faTents } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faPersonHiking } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'; 
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidenav-responsable',
  templateUrl: './sidenav-responsable.component.html',
  styleUrls: ['./sidenav-responsable.component.css']
})
export class SidenavResponsableComponent {
  faDashboard = faDashboard;
  faTents = faTents;
  faExclamationTriangle = faExclamationTriangle;
  faPersonHiking = faPersonHiking;
  faComment = faComment;
  faFaceSmile = faFaceSmile;
  faShoppingCart = faShoppingCart;
}
