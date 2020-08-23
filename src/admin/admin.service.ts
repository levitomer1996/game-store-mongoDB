import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Admin } from './admin.schemna';
import * as bcrypt from 'bcryptjs';
import { throwError } from 'rxjs';
import { AdminSigninDTO } from './DTO/Admin-Signin.DTO';
import { JwtService } from '@nestjs/jwt';
import { AdminJwtPayload } from './AdminJwtPayload.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
  ) {}
  async newAdmin(creds) {
    const salt = await bcrypt.genSalt();
    const genPass = await this.hashPassword(creds.password, salt);
    const admin = new this.adminModel({
      user: creds.user,
      password: genPass,
      isAdmin: true,
    });

    try {
      await admin.save();
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async signIn(
    authCredentialsDto: AdminSigninDTO,
  ): Promise<{ accessToken: string }> {
    const { user, password } = authCredentialsDto;

    const foundUser = await this.adminModel.find({ user });
    const validatePass = await this.validatePassword(
      password,
      foundUser[0].password,
    );

    if (!foundUser) {
      throw new BadRequestException(
        'Invalid detials. Youre user or password details are wrong. ',
      );
    }

    if (!validatePass) {
      throw new BadRequestException(
        'Invalid detials. Youre user or password details are wrong. ',
      );
    }
    const payload: AdminJwtPayload = {
      id: foundUser[0]._id,
      user: foundUser[0].user,
      password: foundUser[0].password,
      isAdmin: foundUser[0].isAdmin,
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async validatePassword(
    pass: string,
    genedPass: string,
  ): Promise<Boolean> {
    const bool = await bcrypt.compare(pass, genedPass);
    return bool;
  }

  getAdminByToken(token: string) {
    const user = this.jwtService.verify(token);
    return user;
  }
}
