import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    ownerName: string,
    renterName: string,
    link: string,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: 'reservation',
      context: {
        ownerName,
        renterName,
        link,
      },
    });
  }
}
