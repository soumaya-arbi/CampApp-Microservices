// authentication-response.ts
export interface AuthenticationResponse {
  [x: string]: string;
  id: string;
    token: string;
    message: string;
    role: string;
    username:string;
  }
  