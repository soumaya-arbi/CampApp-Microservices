export interface Reservation {
  centre: any;
  location: string;
  status: any;
  idReservation: number;
  dateArrivee: Date;
  dateSortie: Date;
  nbrPersonne: number;
  lieux: string;
  hebergement: Hebergement;
  //equipement: Equipement;
  centreDeCamping: CentreDeCamping;
  //userId: number; // Ajoutez userId ici
}

export interface Hebergement {
  // Propriétés de l'hébergement
}

export interface Equipement {
  // Propriétés de l'équipement
}

export interface CentreDeCamping {
  // Propriétés du centre de camping
}
export interface userId{}
