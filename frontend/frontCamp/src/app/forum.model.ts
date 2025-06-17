export interface Forum {
    idForum?: number; // Optional field for primary key
    sujet: string;
    message: string;
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