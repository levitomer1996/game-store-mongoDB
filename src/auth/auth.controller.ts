import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCredentials } from './DTO/SignupCredentials.DTO';
import { LoginCredentials } from './DTO/LoginCredentials.DTO';
import { User } from './user.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async addProduct(@Body() creds: SignupCredentials) {
    const generatedId = await this.authService.signUp(creds);
    return { id: generatedId };
  }
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: LoginCredentials,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
  @Post('/getuserbytoken')
  getUserByToken(@Body() body) {
    const { token } = body;
    return this.authService.getUserByToken(token);
  }

  @Get('/userdetails')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  getUserDetails(@GetUser() user): Promise<User> {
    console.log(user);
    return user;
  }
}
