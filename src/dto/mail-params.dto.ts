export class SendMailParams {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export class CreateSite {
  days: number;
  url: string;
}

export class UpdateSite {
  days: number;
}
