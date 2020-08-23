import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminSigninDTO } from './DTO/Admin-Signin.DTO';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/signin')
  signIn(@Body() creds: AdminSigninDTO): Promise<{ accessToken: string }> {
    return this.adminService.signIn(creds);
  }
  @Post('/getadminbytoken')
  getAdminByToken(@Body('token') token) {
    return this.adminService.getAdminByToken(token);
  }
}
