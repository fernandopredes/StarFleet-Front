export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profile_pic?:string;
  file?:File;
}

export interface RegistrationResponse {
  access_token: string;
  user_id: number;
}
