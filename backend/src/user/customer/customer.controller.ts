import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Req, Session, SetMetadata, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticatedGuard } from '../../utils/local.guard';
import { CreateCustomerDto } from '../../user/customer/dtos/CreateCustomer.dto';
import { UpdateCustomerPasswordDto } from '../../user/customer/dtos/UpdateCustomerPassword.dto';
import { CustomerService} from '../../user/customer/customer.service';
import { Roles } from '../../utils/roles.decorator';
import { RolesGuard } from '../../utils/roles.guard';
import { Role } from '../../utils/role.enum';
import { UpdateUserAddressDto } from '../dtos/UpdateUserAddress.dto';
import { UpdateUserEmailDto } from '../dtos/UpdateUserEmail';
import { AppService } from '../../app.service';
import { MailService } from '../../mail/mail.service';
import { hashPassword } from '../../utils/bcrypt';
import { UpdateCustomerPhoneNumberDto } from './dtos/UpdateCustomerPhoneNumber.dto';
import { CartService } from '../../cart/cart.service';
import { plainToClass } from 'class-transformer';
import { SerializedCustomer } from 'src/utils/serializer';



@Controller('customer')
@UseInterceptors(ClassSerializerInterceptor)
export class CustomerController {
	constructor(
		private readonly customerService: CustomerService,
		private readonly appService: AppService,
		private readonly mailService: MailService
	){}


		
	@Post('registration')
	async createCustomer(@Body() createCustomerDto: CreateCustomerDto){
    const initialPassword = this.appService.generateRandom(32, true, true, true, false, false);
    const hashedInitialPassword = hashPassword(initialPassword);
    const code = this.appService.generateRandom(13, true, true, false, '-', '-');
    const createdAt = new Date();
    const newCustomer = await this.customerService.createCustomerWithGeneratedCode(hashedInitialPassword, code, createdAt, createCustomerDto);
    const name = newCustomer.firstName + ' ' + newCustomer.lastName;
    return this.mailService.sendEmailNewAccount(name, newCustomer.code, initialPassword);
	}

		
		
	@Get('search')
  @UseGuards(RolesGuard)
	@Roles(Role.Admin)
	async getCustomerByParam(@Query() params: any){
    return (await this.customerService.getCustomerByParam(params)).map((customer) => plainToClass(SerializedCustomer, customer));
	}

		

	@Get('all')
  @UseGuards(RolesGuard)
	@Roles(Role.Admin)
	async getAllCustomers(){
    return (await this.customerService.getAllCustomers()).map((customer) => plainToClass(SerializedCustomer, customer));
	}

  @Get('get/:code')
  @UseGuards(RolesGuard)
	@Roles(Role.Admin)
  async getCustomerByCode(@Query('code') code: string){
    return new SerializedCustomer(await this.customerService.getCustomerByCode(code));
  }
		

	@Patch('changeAddress/:code')
  @UseGuards(RolesGuard)
	@Roles(Role.Customer)
	async updateCustomerAddress(@Session() session: Record<string, any>, @Body() updateCustomerAddressDto: UpdateUserAddressDto){
    return this.customerService.updateCustomerAddress(session.passport.user.code, updateCustomerAddressDto);
	}

	@Patch('changeEmail/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Customer)	
	async updateCustomerEmail(@Session() session: Record<string, any>, @Body() updateCustomerEmailDto: UpdateUserEmailDto){
    return this.customerService.updateCustomerEmail(session.passport.user.code, updateCustomerEmailDto);
	}

	@Patch('changePhoneNumber/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Customer)	
	async updateCustomerTelephoneNumber(@Session() session: Record<string, any>, @Body() updateCustomerPhoneNumberDto: UpdateCustomerPhoneNumberDto){
    return this.customerService.updateCustomerPhoneNumber(session.passport.user.code, updateCustomerPhoneNumberDto);
	}

	@Patch('changePassword/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Customer)	
	async updateCustomerPassword(@Session() session: Record<string, any>, @Body() updateCustomerPasswordDto: UpdateCustomerPasswordDto){
    const newPassword = updateCustomerPasswordDto.password;
    updateCustomerPasswordDto.password = hashPassword(updateCustomerPasswordDto.password);
    await this.customerService.updateCustomerPassword(session.passport.user.code, updateCustomerPasswordDto);
    const name = session.passport.user.firstName + ' ' + session.passport.user.lastName;
    return this.mailService.sendNewPassword(name, newPassword);
	}

	@Patch('resetPassword')
  @UseGuards(RolesGuard)
	@Roles(Role.Admin)
	async resetCustomerPassword(@Query('code') code: string){
    const customer = await this.customerService.getCustomerByCode(code);
    const name = customer.firstName + ' ' + customer.lastName;
    const newGeneratedPassword = this.appService.generateRandom(32, true, true, true, false, false);
    const resetCustomerPassword = hashPassword(newGeneratedPassword);
    await this.customerService.resetCustomerPassword(code, resetCustomerPassword);
    return this.mailService.sendResetPassword(name, newGeneratedPassword);
	}



	@Delete('delete/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Customer, Role.Admin)	
	async deleteCustomer(@Session() session: Record<string, any>, @Query('code') code: string){
    const user = session.passport.user;
    if(user.role === 'customer'){
      if(user.code === code){
        return this.customerService.deleteCustomer(code);
      }
      else{
        return('Not authorized');
      }
    }
    if(user.role === 'admin'){
      return this.customerService.deleteCustomer(code);
    }
    

	}

		

}