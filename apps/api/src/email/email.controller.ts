import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send')
  async sendEmail(
    @Body()
    body: {
      to: string;
      subject: string;
      ownerName: string;
      renterName: string;
      link: string;
    },
  ) {
    await this.emailService.sendEmail(
      body.to,
      body.subject,
      body.ownerName,
      body.renterName,
      body.link,
    );

    return { message: 'Email sent' };
  }
}
