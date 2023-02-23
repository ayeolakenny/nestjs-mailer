import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateSite, SendMailParams } from './dto/mail-params.dto';
import { unixToDaysLeft } from './utils/date';
// import * as dns from 'dns';

@Controller('mail')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // send(@Req() req: Request) {
  //   // @ts-ignore
  //   // return 'Hello';
  //   // @ts-ignore
  //   var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  //   console.log(fullUrl);

  //   dns.lookup('aptos-launch.org', (error, address, family) => {
  //     // if an error occurs, eg. the hostname is incorrect!
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       // if no error exists
  //       console.log(
  //         `The ip address is ${address} and the ip version is ${family}`,
  //       );
  //     }
  //   });
  //   return 'Hello';
  // }

  @Post()
  sendMail(@Body() input: SendMailParams) {
    if (input.to === 'arianabobby50@gmail.com') {
      throw new BadRequestException();
    }
    // // @ts-ignore
    // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(fullUrl);

    return this.appService.sendMail(input);
  }

  @Post('create-site')
  createSite(@Body() input: CreateSite) {
    return this.appService.createSite(input);
  }

  @Get('site')
  async getSites() {
    let modified = [];
    const sites = await this.appService.getSites();
    for (let site of sites) {
      modified.push({
        url: site.url,
        expires: unixToDaysLeft(Number(site.expires)),
      });
    }
    return modified;
  }
}
