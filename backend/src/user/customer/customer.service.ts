import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../../typeorm/entities/CustomerEntity';
import { CreateCustomerDto } from '../../user/customer/dtos/CreateCustomer.dto';
import { UpdateCustomerPasswordDto } from '../../user/customer/dtos/UpdateCustomerPassword.dto';
import { UpdateUserAddressDto } from '../dtos/UpdateUserAddress.dto';
import { UpdateUserEmailDto } from '../dtos/UpdateUserEmail';
import { UpdateCustomerPhoneNumberDto } from './dtos/UpdateCustomerPhoneNumber.dto';

@Injectable()
export class CustomerService {


	constructor(
		@InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>,
	){}



//Create/Registration Function    

	async createCustomerWithGeneratedCode(hashedInitialPassword: string, code: string, createdAt: Date, createCustomerDto: CreateCustomerDto){

				
		const newCustomer = await this.customerRepository.create({
			...createCustomerDto,
			code: code,
			password: hashedInitialPassword,
			createdAt: createdAt,
		});
				
				
		if(await this.customerRepository.save(newCustomer)){
			return newCustomer;
		} 
	}




//Get Functions

	async getAllCustomers(){
		return await this.customerRepository.find();			
	}

	async getCustomerByParam(params: any){
		return await this.customerRepository.findBy(params);
	}


	async getCustomerByCode(code: string){
		return await this.customerRepository.findOne({where: {code}});
	}


	async getCustomerByEmail(email: string){
		return await this.customerRepository.findOne({where: {email}});
	}



		
//Update/Patch Functions

	async updateCustomerAddress(code: string, updateCustomerAddressDto: UpdateUserAddressDto){       
		return await this.customerRepository.update({code}, {...updateCustomerAddressDto});
	}

	async updateCustomerEmail(code: string, updateCustomerEmailDto: UpdateUserEmailDto){
		return await this.customerRepository.update({code}, {...updateCustomerEmailDto});
	}

	async updateCustomerPhoneNumber(code: string, updateCustomerPhoneNumberDto: UpdateCustomerPhoneNumberDto){
		return await this.customerRepository.update({code}, {...updateCustomerPhoneNumberDto});
	}
		
	async updateCustomerPassword(code: string, updateCustomerPasswordDto: UpdateCustomerPasswordDto){
		return await this.customerRepository.update({code}, {...updateCustomerPasswordDto});
	}
  
	async resetCustomerPassword(code: string, resetCustomerPassword: string){
		return await this.customerRepository.update({code}, {password: resetCustomerPassword});
	}

//Delete Function    

	async deleteCustomer(code: string){
		return await this.customerRepository.delete(code);
	}

}