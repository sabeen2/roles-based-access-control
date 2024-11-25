export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISignupRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
