import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

@Module({
  imports: [MailerModule.forRoot({
    
    transport: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.TEST_EMAIL,
        pass: process.env.TEST_EMAIL_PASSWORD,
      }
    },
    
    defaults: {
      from: '"No Reply" <noreply@example.com>',

    },
    preview: true,
    template: {
      dir: join(__dirname, '/templates'),
      adapter: new PugAdapter(),      
    },
    options: {
      strict: true,
    }
    
  }),],
  controllers: [],
  providers: [
    MailService
  ],


})
export class MailModule {}
