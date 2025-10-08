import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import entities from './typeorm/entitiesIndex';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from './user/customer/customer.module';
import { MerchantModule } from './user/merchant/merchant.module';
import { AppService } from './app.service';
import { ObjectModule } from './object/object.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CartModule } from './cart/cart.module';
import { AdminModule } from './user/admin/admin.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';








@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_DOCKER_SECRET,
      database: process.env.DB_DATABASE,
      entities: entities,
      synchronize: true,
      extra: {
        decimalNumbers: true,
      }
    }), 
    PassportModule.register({
      session: true,
    }),
    CustomerModule, 
    AuthModule, 
    MerchantModule,
    MailModule,
    MailerModule, 
    ObjectModule, 
    CartModule, 
    AdminModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
