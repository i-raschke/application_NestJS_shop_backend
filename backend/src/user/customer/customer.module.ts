import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '../../app.service';
import { ConfirmationCustomerMiddleware } from '../../middlewares/confirmation.customer.middleware';
import { ValidationCustomerMiddleware } from '../../middlewares/validation.customer.middleware';
import entities from '../../typeorm/entitiesIndex';
import { CustomerController } from './customer.controller';
import { CustomerService} from './customer.service';
import { MailService } from '../../mail/mail.service';


@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [CustomerController],
  providers: [
    CustomerService, 
    AppService, 
    MailService
    
  ],


})


export class CustomerModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ValidationCustomerMiddleware)
    .exclude({
      path: 'customer/resetPassword',
      method: RequestMethod.PATCH,
    })
    .forRoutes({
      path: 'customer/*',
      method: RequestMethod.PATCH,
    },)
    .apply(ConfirmationCustomerMiddleware)
    .forRoutes({
      path: 'customer/changePassword/*',
      method: RequestMethod.PATCH,

    },)
    .apply(ValidationCustomerMiddleware)
    .forRoutes({
      path: 'customer/*',
      method: RequestMethod.DELETE,

    },);
      
  }

  
}
