import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MerchantEntity } from '../../typeorm/entitiesIndex';
import { Repository } from 'typeorm';
import { CreateMerchantDto } from './dtos/CreateMerchant.dto';
import { UpdateUserAddressDto } from '../dtos/UpdateUserAddress.dto';
import { UpdateUserEmailDto } from '../dtos/UpdateUserEmail';
import { UpdateMerchantPasswordDto } from './dtos/UpdateMerchantPassword.dto';
import { UpdateMerchantPhoneNumberDto } from './dtos/UpdateMerchantPhoneNumber.dto';

@Injectable()
export class MerchantService {

	constructor(
		@InjectRepository(MerchantEntity) private readonly merchantRepository: Repository<MerchantEntity>,
	){}

// Post Functions

	async createMerchant(hashedInitialPassword: string, code: string, createdAt: Date, createMerchantDto: CreateMerchantDto){
		const newMerchant = await this.merchantRepository.create({
			...createMerchantDto,
			code: code,
			password: hashedInitialPassword,
			createdAt: createdAt,
		});
				
		if(await this.merchantRepository.save(newMerchant)){
			return newMerchant;
		}

	}

//Get Functions

	async getAllMerchants(){
		return await this.merchantRepository.find();
	}

	async getMerchantByParam(params: any){
		return await this.merchantRepository.findBy(params);
	}

	async getMerchantByCode(code: string){
		return await this.merchantRepository.findOne({where: {code}});
	}

	async getMerchantByCompanyName(companyName: string){
		return await this.merchantRepository.findOne({where: {companyName}});
	}

//Patch/Update Functions

	async updateMerchantPassword(code: string, updateMerchantPasswordDto: UpdateMerchantPasswordDto){
		return await this.merchantRepository.update({code}, {...updateMerchantPasswordDto});
	}

	async updateMerchantAddress(code: string, updateMerchantAddressDto: UpdateUserAddressDto){
		return await this.merchantRepository.update({code}, {...updateMerchantAddressDto});
	}

	async updateMerchantEmail(code: string, updateMerchantEmailDto: UpdateUserEmailDto){
		return await this.merchantRepository.update({code}, {...updateMerchantEmailDto});
	}

	async updateMerchantPhoneNumber(code: string, updateMerchantPhoneNumberDto: UpdateMerchantPhoneNumberDto){
		return await this.merchantRepository.update({code}, {...updateMerchantPhoneNumberDto});
	}

  async resetMerchantPassword(code: string, resetMerchantPassword: string){
		return await this.merchantRepository.update({code}, {password: resetMerchantPassword});
	}

//Delete Functions

	async deleteMerchant(code: string){
		return await this.merchantRepository.delete({code});
	}
		

}
