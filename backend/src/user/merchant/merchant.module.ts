import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '../../app.service';
import entities from '../../typeorm/entitiesIndex';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { ConfirmationMerchantMiddleware } from '../../middlewares/confirmation.merchant.middleware';
import { ValidationMerchantMiddleware } from '../../middlewares/validation.merchant.middleware';
import { MailService } from '../../mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities), 
  ],
  controllers: [MerchantController],
  providers: [
    MerchantService, 
    AppService, 
    MailService
  ]
})


export class MerchantModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ValidationMerchantMiddleware)
    .forRoutes({
      path: 'merchant/*',
      method: RequestMethod.PATCH,
    },)
    .apply(ConfirmationMerchantMiddleware)
    .forRoutes({
      path: 'merchant/changePassword/*',
      method: RequestMethod.PATCH,

    },)
    .apply(ValidationMerchantMiddleware)
    .forRoutes({
      path: 'merchant/*',
      method: RequestMethod.DELETE,
    });
      
  }}
