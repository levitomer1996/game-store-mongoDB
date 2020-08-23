import { IsString } from 'class-validator';
export class AdminSigninDTO {
  @IsString()
  user: string;
  @IsString()
  password: string;
}
