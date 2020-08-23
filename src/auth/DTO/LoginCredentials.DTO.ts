import { IsEmail, IsSemVer, IsString } from 'class-validator';
export class LoginCredentials {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
