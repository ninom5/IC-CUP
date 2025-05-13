import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailConfig } from './email.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: EmailConfig,
    }),
  ],

  providers: [EmailService, EmailConfig],
  exports: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
