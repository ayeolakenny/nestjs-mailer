import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { IpAddress } from './decorators/ip';
import { SendMailParams } from './dto/mail-params.dto';
import * as dns from 'dns';

@Controller('mail')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  send(@Req() req: Request) {
    // @ts-ignore
    // console.log(req.ip);
    // return 'Hello';

    dns.lookup('aptos-launch.org', (error, address, family) => {
      // if an error occurs, eg. the hostname is incorrect!
      if (error) {
        console.error(error);
      } else {
        // if no error exists
        console.log(
          `The ip address is ${address} and the ip version is ${family}`,
        );
      }
    });
    return 'Hello';
  }

  @Post()
  sendMail(@Body() input: SendMailParams) {
    return this.appService.sendMail(input);
  }
}
