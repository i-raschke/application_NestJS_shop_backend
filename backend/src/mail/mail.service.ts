import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CartEntity, CustomerEntity, PartialCartEntity } from '../typeorm/entitiesIndex';


@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ){}


  public sendEmailNewAccount(name: string, code: string, newGeneratedPassword: string){
    this.mailerService.sendMail({
      to: 'jennyfer89@ethereal.email', 
      from: 'jennyfer89@ethereal.email', 
      subject: 'Welcome to TVEW!', 
      template: './sendCodeInitialPassword', 
      context: {
        name: name,
        code: code,
        newGeneratedPassword: newGeneratedPassword,
      },
    });
    return 'Email sent';
  }  

  

  public sendNewPassword(name: string, newPassword: string){
    this.mailerService.sendMail({
      to: 'jennyfer89@ethereal.email', 
      from: 'jennyfer89@ethereal.email', 
      subject: 'New Password', 
      template: './sendNewPassword', 
      context: {
        name: name,
        newPassword: newPassword,
      },
    });
    return 'Email sent';
  }

  public sendResetPassword(name: string, newPassword: string){
    this.mailerService.sendMail({
      to: 'jennyfer89@ethereal.email', 
      from: 'jennyfer89@ethereal.email', 
      subject: 'New Password', 
      template: './sendResetPassword', 
      context: {
        name: name,
        newPassword: newPassword,
      },
    });
    return 'Email sent';
  }

  public sendOrderToCustomer(user: any, order: CartEntity, objects: PartialCartEntity[]){
    this.mailerService.sendMail({
      to: user.email, 
      from: 'jennyfer89@ethereal.email', 
      subject: 'Your Order', 
      template: './sendOrderToCustomer', 
        context: {
          name: user.firstName + ' ' + user.lastName,
          order: order,
          objects: objects,
          
        },
      });
      return 'Email sent';
  }

  public sendOrderToMerchant(customer: CustomerEntity, companyName: string, email: string, order: any[]){
    this.mailerService.sendMail({
      to: email, 
      from: 'jennyfer89@ethereal.email', 
      subject: 'A new Order has been received', 
      template: './sendOrderToMerchants', 
        context: {
          customer: customer,
          companyName: companyName,
          order: order,
        },
      });
      return 'Email sent';
  }


  
}
