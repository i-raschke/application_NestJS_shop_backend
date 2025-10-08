import { Body, ClassSerializerInterceptor, Controller, Delete, Get, ParseFloatPipe, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { MerchantService } from '../user/merchant/merchant.service';
import { SerializedObject } from '../utils/serializer';
import { CreateObjectDto } from './dtos/CreateObject.dto';
import { UpdateObjectAmountDto } from './dtos/UpdateObjectAmount.dto';
import { ObjectService } from './object.service';
import { Roles } from '../utils/roles.decorator';
import { Role } from '../utils/role.enum';
import { UpdateObjectPriceDto } from './dtos/UpdateObjectPrice.dto';
import { plainToClass } from 'class-transformer';
import { RolesGuard } from '../utils/roles.guard';


@Controller('object')
@UseInterceptors(ClassSerializerInterceptor)
export class ObjectController {
	constructor(private readonly objectService: ObjectService,
	private readonly merchantService: MerchantService){}

//Post Routes  

  @UseGuards(RolesGuard)
	@Roles(Role.Merchant)
	@Post('registration')
	async createObject(@Session() session: Record<string, any>, @Body() createObjectDto: CreateObjectDto){
    const merchant = await this.merchantService.getMerchantByCode(session.passport.user.code);
    
    return await this.objectService.createObject(createObjectDto, merchant);
	}

//Get Routes

	@Get('search')
	async searchObject(@Query() params: any){
    return (await this.objectService.getObjectsByAnyParam(params)).map((object) => plainToClass(SerializedObject, object));
	}

	@Get('searchUpToPrice')
	async getObjectsLessEqualPrice(@Query('price', ParseFloatPipe) price: number){
    return this.objectService.getObjectsUpToPrice(price);
	}


  @UseInterceptors(ClassSerializerInterceptor)
	@Get('objectNumber/:objectNumber')
	async getByObjectNumber(@Query() objectNumber: string){
    const object = await this.objectService.getObjectByobjectNumberWithRelationMerchant(objectNumber);

    return (new SerializedObject(object));
	}
		
  @UseInterceptors(ClassSerializerInterceptor)
	@Get('all')
	async getAllObjects(){
    return (await this.objectService.getAllObjects()).map((object) => plainToClass(SerializedObject, object));
	}

  @UseInterceptors(ClassSerializerInterceptor)
	@Get('companyName')
	async getByCompanyName(@Query('companyName') companyName: string){
    return (await this.objectService.getObjectsByCompanyName(companyName)).map((object) => plainToClass(SerializedObject, object));
	}

//Patch Routes

  @UseGuards(RolesGuard)
	@Roles(Role.Merchant)
	@Patch('updateAmount')
	async updateObjectAmount(@Session() session: Record<string, any>, @Query('objectNumber') objectNumber: string, @Body() updateObjectAmountDto: UpdateObjectAmountDto){
    const object = await this.objectService.getObjectByobjectNumberWithRelationMerchant(objectNumber);

    if(session.passport.user.companyName === object.merchant.companyName){
      if(updateObjectAmountDto.amount > 0){
        updateObjectAmountDto.available = true;
      }
      else {updateObjectAmountDto.available = false;}				
      return (await this.objectService.updateObjectAmount(objectNumber, updateObjectAmountDto));
    }
    else{
      return ('Invalid request');
    }
	}

  @UseGuards(RolesGuard)
	@Roles(Role.Merchant)
	@Patch('updatePrice')
	async updateObjectPrice(@Session() session: Record<string, any>,  @Query('objectNumber') objectNumber: string, @Body() updateObjectPriceDto: UpdateObjectPriceDto){
    const object = await this.objectService.getObjectByobjectNumberWithRelationMerchant(objectNumber);

    if(session.passport.user.companyName === object.merchant.companyName){					
      return await this.objectService.updateObjectPrice(objectNumber, updateObjectPriceDto);
    }
    else{
      return('Invalid request')
    }
	}

//Delete Routes  

  @UseGuards(RolesGuard)
	@Roles(Role.Merchant)
	@Delete('delete')
	async deleteObject(@Session() session: Record<string, any>, @Body() body){
    const {objectNumber} = body;
    const user = session.passport.user;
    const object = await this.objectService.getObjectByobjectNumberWithRelationMerchant(objectNumber);

    if(user.companyName === object.merchant.companyName){
      return this.objectService.deleteObject(objectNumber);
    }
    else{
      return('Invalid request');
    }
	}

	
}
