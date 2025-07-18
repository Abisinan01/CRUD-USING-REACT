export interface FormData {
  username: string;
  email: string;
  password: string | number;
  confirmPassword: string | number;
  role: 'user'|'admin'
}

export interface IUsers {
  _id: string;
  username: string;
  email: string;
  profile: string;
  role: string
}
