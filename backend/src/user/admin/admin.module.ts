import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../../typeorm/entitiesIndex';
import { AppService } from '../../app.service';
import { ConfirmationAdminMiddleware } from '../../middlewares/confirmation.admin.middleware';
import { ValidationAdminMiddleware } from '../../middlewares/validation.admin.middleware';
import { MailService } from '../../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AdminController],
  providers: [
    AdminService,
    AppService,
    MailService
  ]
})
export class AdminModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ValidationAdminMiddleware)
    .forRoutes({
      path: 'admin/*',
      method: RequestMethod.PATCH,
    },)
    .apply(ConfirmationAdminMiddleware)
    .forRoutes({
      path: 'admin/changePassword/*',
      method: RequestMethod.PATCH,

    },)
    .apply(ValidationAdminMiddleware)
    .forRoutes({
      path: 'admin/*',
      method: RequestMethod.DELETE,

    },);
      
  }

}



