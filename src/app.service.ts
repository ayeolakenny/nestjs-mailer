import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateSite, SendMailParams, UpdateSite } from './dto/mail-params.dto';
import { Monitor, MonitorDocument } from './schema/monitor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { daysToUnix, unixToDaysLeft } from './utils/date';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(Monitor.name) private monitorModel: Model<MonitorDocument>,
  ) {}

  async createSite(input: CreateSite): Promise<Boolean> {
    const { days, url } = input;
    const expires = daysToUnix(days);
    const site = new this.monitorModel({
      url,
      expires: expires.toString(),
    });
    site.save();
    return true;
  }

  async getSites() {
    return this.monitorModel.find();
  }

  async deleteSite(siteId: number): Promise<Boolean> {
    this.monitorModel.find({ _id: siteId }).remove().exec();
    return true;
  }

  async updateSite(siteId: number, input: UpdateSite): Promise<Boolean> {
    const expires = daysToUnix(input.days);
    await this.monitorModel
      .find({ _id: siteId })
      .update({ expires: expires.toString() });
    return true;
  }

  sendMail(input: SendMailParams) {
    const { from, html, subject, text, to } = input;
    this.mailerService
      .sendMail({ to, from, subject, text, html })
      .then((success) => console.log(success))
      .catch((err) => console.log(err));
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async checkExpiredSites() {
    const sites = await this.monitorModel.find();
    for (let site of sites) {
      const expires = unixToDaysLeft(Number(site.expires));
      if (expires === 1) {
        this.sendMail({
          from: 'Kehinde',
          html: `${site.url} would expire in one day`,
          subject: 'Site Expiry',
          text: `${site.url} would expire in one day`,
          to: 'kazeemawesome@gmail.com',
        });
      }

      if (expires <= 0) {
        this.sendMail({
          from: 'Kehinde',
          html: `${site.url} hosting has expired`,
          subject: 'Site Expiry',
          text: `${site.url} hosting has expired`,
          to: 'kazeemawesome@gmail.com',
        });
      }
    }
  }
}
