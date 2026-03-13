export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: 'buyer' | 'seller';
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  name: string;
  phone: string;
  email: string;
  password: string;
}
