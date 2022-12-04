import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendMailParams } from './dto/mail-params.dto';

@Controller('mail')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  sendMail(@Body() input: SendMailParams) {
    return this.appService.sendMail(input);
  }
}
