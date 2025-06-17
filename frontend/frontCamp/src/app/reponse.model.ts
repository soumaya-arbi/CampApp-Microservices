export interface Reponse {
  idReponse?: number;
  contenu: string;
  dateReponse?: Date;
  user: Partial<User>;
  reclamation: Partial<Reclamation>;
}
export interface Reclamation {
  idReclamation: number;
  sujet: string;
  description: string;
  date: Date;
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
