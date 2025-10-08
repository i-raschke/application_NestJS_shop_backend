import { Module } from '@nestjs/common';
import { ObjectService } from '../object/object.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../typeorm/entitiesIndex';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MailService } from '../mail/mail.service';

@Module({
	imports: [
		TypeOrmModule.forFeature(entities), 
	],
	controllers: [CartController],
	providers: [
		CartService,
		ObjectService,
    MailService
		]
})
export class CartModule {}
