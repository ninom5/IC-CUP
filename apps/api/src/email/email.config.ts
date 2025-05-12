import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';

@Injectable()
export class EmailConfig implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      },
      defaults: {
        from: `"Kolo" <${process.env.USER_EMAIL}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
