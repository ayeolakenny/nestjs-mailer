import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailParams } from './dto/mail-params.dto';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(input: SendMailParams) {
    const { from, html, subject, text, to } = input;
    this.mailerService
      .sendMail({ to, from, subject, text, html })
      .then((success) => console.log(success))
      .catch((err) => console.log(err));
  }
}
