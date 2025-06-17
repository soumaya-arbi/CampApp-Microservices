export interface Reservation {
  dateArrivee: Date;
  dateSortie: Date;
  nbrPersonne: number;
  lieux: string;
  idHebergement: number;
  //idEquipement: number;
  idCentre: number;
  status: string;

  hebergement?: Hebergement; // Utilisez ? pour indiquer que la propriété est optionnelle
  equipement?: Equipement; // Utilisez ? pour indiquer que la propriété est optionnelle
  centreDeCamping?: CentreDeCamping; // Utilisez ? pour indiquer que la propriété est optionnelle
  //userId: number;
}

export interface Hebergement {
  id: number;
  // Autres propriétés
}

export interface Equipement {
  id: number;
  // Autres propriétés
}

export interface CentreDeCamping {
  idCentre: number;
  // Autres propriétés
}
