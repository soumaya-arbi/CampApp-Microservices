export interface Reclamation {
    idReclamation?: number;
    sujet: string;
    description: string;
    date: Date;
    user: Partial<User>; // Utiliser Partial<User> pour accepter une version partielle de l'utilisateur
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
