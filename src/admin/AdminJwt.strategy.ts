import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminJwtPayload } from './AdminJwtPayload.interface';
import { InjectRepository } from '@nestjs/typeorm';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './admin.schemna';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'admintomer',
    });
  }

  async validate(payload: AdminJwtPayload): Promise<Admin> {
    const { id } = payload;

    const user = await this.adminModel.findById(id).exec();

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
