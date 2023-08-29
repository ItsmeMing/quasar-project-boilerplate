export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: {
    id: number;
    role: string;
  };
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface SuccessAuth {
  token: string;
  user: User;
}
