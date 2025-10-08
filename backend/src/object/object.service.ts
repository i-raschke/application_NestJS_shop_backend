import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MerchantEntity, ObjectEntity } from '../typeorm/entitiesIndex';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateObjectDto } from './dtos/CreateObject.dto';
import { UpdateObjectAmountDto } from './dtos/UpdateObjectAmount.dto';
import { UpdateObjectPriceDto } from './dtos/UpdateObjectPrice.dto';

@Injectable()
export class ObjectService {
	constructor(
		@InjectRepository(ObjectEntity) private readonly objectRepostitory: Repository<ObjectEntity>,
	){}
 

//Create/Register Function

	async createObject(createObjectDto: CreateObjectDto, merchant: MerchantEntity){

		
		if (createObjectDto.amount === 0){
			createObjectDto.available = false;
		}
		else{
			createObjectDto.available = true;
		}
    const newObject = this.objectRepostitory.create({...createObjectDto, createdAt: new Date(), merchant});
		return await this.objectRepostitory.save(newObject);
	}

//Get Funtions

	async getAllObjects(){
		return await this.objectRepostitory.find();
	}

	async getObjectsByAnyParam(params: any){
		return await this.objectRepostitory.findBy(params);
	}

	async getObjectByObjectNumber(objectNumber: string){
		const object = await this.objectRepostitory.findOne({where: {objectNumber}});
		return object;
	}


	async getObjectByobjectNumberWithRelationMerchant(objectNumber: string){
		const object = await this.objectRepostitory.findOne({where: {objectNumber}, relations: {merchant: true}});
		return object;
	}


	async getObjectsByCompanyName(companyName: string){
		return await this.objectRepostitory.find({relations: ['merchant'], where: {merchant: {companyName: companyName}}});

	}


	async getObjectsByColor(color: string){
		return await this.objectRepostitory.find({where: {color}});
	}

	async getObjectsUpToPrice(price: number){
		return await this.objectRepostitory.findBy({price: LessThanOrEqual(price)});
	}


//Patch/Update Functions

	async updateObjectAmount(objectNumber: string, updateObjectAmountDto: UpdateObjectAmountDto){
		return await this.objectRepostitory.update({objectNumber}, {...updateObjectAmountDto});
	}

	async updateObjectPrice(objectNumber: string, updateObjectPriceDto: UpdateObjectPriceDto){
		return await this.objectRepostitory.update({objectNumber}, {...updateObjectPriceDto});
	}

//Delete Function
	async deleteObject(objectNumber: string){
		return await this.objectRepostitory.delete({objectNumber});
	}



}
