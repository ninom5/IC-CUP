import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { existsSync } from 'fs';

@Injectable()
export class EmailConfig implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    const rootDir = process.cwd();

    console.log('root dir', rootDir);

    const devPath = join(rootDir, 'templates');
    const prodPath = join(rootDir, 'dist', 'apps', 'api', 'templates');

    const templatesPath = existsSync(prodPath) ? prodPath : devPath;
    console.log('Templates path being used:', templatesPath);

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
        dir: templatesPath,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
