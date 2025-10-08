import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dtos/CreateAdmin.dto';
import { UpdateAdminPasswordDto } from './dtos/UpdateAdminPassword.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../../typeorm/entitiesIndex';
import { Repository } from 'typeorm';
import { UpdateUserEmailDto } from '../dtos/UpdateUserEmail';
import { UpdateUserAddressDto } from '../dtos/UpdateUserAddress.dto';
import { UpdateAdminPhoneNumberDto } from './dtos/UpdateAdminPhoneNumber.dto';

@Injectable()
export class AdminService {
  constructor(
  @InjectRepository(AdminEntity) private readonly adminRepository: Repository<AdminEntity>,
  ){}


//Create/Registration Function  

  async createAdmin(hashedInitialPassword: string, code: string, createdAt: Date, createAdminDto: CreateAdminDto) {
    const newAdmin = this.adminRepository.create({
      ...createAdminDto,
      code: code,
      password: hashedInitialPassword,
      createdAt: createdAt,
    });
    
    if(await this.adminRepository.save(newAdmin)){
      return newAdmin;
    }
  }

//Get Functions

  async getAllAdmins() {
    return await this.adminRepository.find();
  }

  async getAdminByCode(code: string) {
    return await this.adminRepository.findOneBy({code});

  }

//Update/Patch Functions  

  async updateAdminEmail(code: string, updateAdminEmailDto: UpdateUserEmailDto){
    return await this.adminRepository.update({code}, {...updateAdminEmailDto});
  }

  async updateAdminAddress(code: string, updateAdminAddressDto: UpdateUserAddressDto){
    return await this.adminRepository.update({code}, {...updateAdminAddressDto});
  }

  async updateAdminPhoneNumber(code: string, updateAdminPhoneNumberDto: UpdateAdminPhoneNumberDto){
    return await this.adminRepository.update({code}, {...updateAdminPhoneNumberDto});
  }

  async updateAdminPassword(code: string, updateAdminPasswordDto: UpdateAdminPasswordDto) {    
    return await this.adminRepository.update({code}, {...updateAdminPasswordDto});
  }

  async resetAdminPassword(code: string, resetCustomerPassword: string){
		return await this.adminRepository.update({code}, {password: resetCustomerPassword});
	}

//Delete Function

  //deletes an admin only, if at least one admin remains
  async deleteAdmin(code: string) {
    const numberOfAdmins = await this.adminRepository.count();
    if(numberOfAdmins > 1){
      return await this.adminRepository.delete({code});
    }
    else return("You are the last of your kind");
  }
}
