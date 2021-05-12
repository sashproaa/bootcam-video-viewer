export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  subscription: string;
  token: string;
  message: string;
  error?: string;
}
