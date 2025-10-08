import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MerchantService } from '../user/merchant/merchant.service';
import entities from '../typeorm/entitiesIndex';
import { ObjectController } from './object.controller';
import { ObjectService } from './object.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities),
    AuthModule,
  ],
  controllers: [ObjectController],
  providers: [
    ObjectService, 
    MerchantService]
})
export class ObjectModule {}
