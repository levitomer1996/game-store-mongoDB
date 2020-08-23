import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { LoginCredentials } from './DTO/LoginCredentials.DTO';
import { JwtPayload } from './jwt-payload.interface';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async signUp(creds) {
    const salt = await bcrypt.genSalt();
    const genPass = await this.hashPassword(creds.password, salt);
    const newProduct = new this.userModel({
      ...creds,
      password: genPass,
      salt,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async signIn(
    authCredentialsDto: LoginCredentials,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userModel.find({ email });

    if (!user) {
      throw new BadRequestException(
        'Invalid detials. Youre user or password details are wrong. ',
      );
    } else if (!bcrypt.compare(password, user[0].password)) {
      throw new BadRequestException(
        'Invalid detials. Youre user or password details are wrong. ',
      );
    }

    const payload: JwtPayload = {
      email: user[0].email,
      f_name: user[0].f_name,
      l_name: user[0].l_name,
      id: user[0].id,
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  getUserByToken(token) {
    const user = this.jwtService.verify(token);
    return user;
  }
  //GenPass function
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
  private async validatePassword(pass) {}
}
