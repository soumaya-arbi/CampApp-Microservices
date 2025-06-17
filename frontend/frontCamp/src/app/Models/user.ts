// user.ts
export interface User {
    id?: number;
    firstName?: string; // Rendre la propriété firstName facultative
    lastName?: string; // Rendre la propriété lastName facultative
    username: string;
    password: string;
   role : string;
   token: string;
  }
  