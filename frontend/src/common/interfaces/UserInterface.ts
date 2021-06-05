export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  mobile: string;
  date_of_birth: string;
  gender: string;
  avatar: string;
  is_active: boolean;
  is_staff: boolean;
  is_superUser: boolean;
  // groups: string[];
}
