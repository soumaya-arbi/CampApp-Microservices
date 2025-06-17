import { Component } from '@angular/core';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faTents } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faPersonHiking } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'; 
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  faDashboard = faDashboard;
  faTents = faTents;
  faExclamationTriangle = faExclamationTriangle;
  faPersonHiking = faPersonHiking;
  faComment = faComment;
  faFaceSmile = faFaceSmile;
  faShoppingCart = faShoppingCart;
}
