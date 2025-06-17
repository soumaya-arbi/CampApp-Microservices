export interface Activite {
    idActivite: number;
    nom: string;
    tarif: number;
    nbrPersonne: number;
    description: string;
  image: string;
  centreId: number;
  statut: number;
    user: Partial<User>;
  }
  export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    username: string;
    password: string;
    role: string;
    token: string;
  }
    