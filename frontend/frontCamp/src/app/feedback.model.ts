import { User } from './Models/user';
export interface Feedback {
  idFeedback?: number;
  commentaire: string;
  note: number;
  user?: User;
  centreId: number;
}
