import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { IpAddress } from './decorators/ip';
import { SendMailParams } from './dto/mail-params.dto';

@Controller('mail')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  send(@Req() req: Request) {
    // @ts-ignore
    console.log(req.ip);
    return 'Hello';
  }

  @Post()
  sendMail(@Body() input: SendMailParams) {
    return this.appService.sendMail(input);
  }
}
