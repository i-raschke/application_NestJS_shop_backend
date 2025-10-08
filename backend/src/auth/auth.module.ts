import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from '../user/customer/customer.service';
import entities from '../typeorm/entitiesIndex';
import { AppService } from '../app.service';
import { MerchantService } from '../user/merchant/merchant.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../utils/local.strategy';
import { SessionSerializer } from '../utils/SessionSerializer';
import { CustomerModule } from '../user/customer/customer.module';
import { MerchantModule } from '../user/merchant/merchant.module';
import { ObjectService } from '../object/object.service';
import { CartService } from '../cart/cart.service';
import { AdminService } from '../user/admin/admin.service';

@Module({
	controllers: [AuthController],
	imports: [
		TypeOrmModule.forFeature(entities), 
		PassportModule.register({session: true}),
		CustomerModule,
		MerchantModule
 ],
	
	
	providers: [
		AuthService,
		AdminService,
		CustomerService,
		AppService,
		MerchantService,
		ObjectService,
		CartService,
		LocalStrategy,
		SessionSerializer,
	

	],

	

})
export class AuthModule {}