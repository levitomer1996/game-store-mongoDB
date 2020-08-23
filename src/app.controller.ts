import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  UploadedFile(@UploadedFile() file) {
    console.log(file);
  }
  @Get(':imgpath')
  seeUploadedFile(@Res() res, @Param('imgpath') img) {
    return res.sendFile(img, { root: 'uploads' });
  }
}
