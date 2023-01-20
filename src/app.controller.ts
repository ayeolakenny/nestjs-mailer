import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IpAddress } from './decorators/ip';
import { SendMailParams } from './dto/mail-params.dto';

@Controller('mail')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  send(@IpAddress() ipAddress) {
    console.log(ipAddress);
    return 'Hello';
  }

  @Post()
  sendMail(@Body() input: SendMailParams) {
    return this.appService.sendMail(input);
  }
}
