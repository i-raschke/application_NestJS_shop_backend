import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateMerchantDto } from './dtos/CreateMerchant.dto';
import { MerchantService } from './merchant.service';
import { UpdateUserAddressDto } from '../dtos/UpdateUserAddress.dto';
import { UpdateUserEmailDto } from '../dtos/UpdateUserEmail';
import { UpdateMerchantPhoneNumberDto } from './dtos/UpdateMerchantPhoneNumber.dto';
import { Roles } from '../../utils/roles.decorator';
import { Role } from '../../utils/role.enum';
import { AppService } from '../../app.service';
import { MailService } from '../../mail/mail.service';
import { hashPassword } from '../../utils/bcrypt';
import { RolesGuard } from '../../utils/roles.guard';
import { UpdateMerchantPasswordDto } from './dtos/UpdateMerchantPassword.dto';
import { plainToClass } from 'class-transformer';
import { SerializedMerchant } from 'src/utils/serializer';

@Controller('merchant')
@UseInterceptors(ClassSerializerInterceptor)
export class MerchantController {
	constructor(
		private readonly merchantService: MerchantService,
		private readonly appService: AppService,
		private readonly mailService: MailService,
	){}



//Post Routes		

	@Post('registration')
	async createMerchant(@Body() createMerchantDto: CreateMerchantDto){
    const initialPassword = this.appService.generateRandom(32, true, true, true, false, false);
    const hashedInitialPassword = hashPassword(initialPassword);
    const code = this.appService.generateRandom(7, true, true, false, '-', '-');
    const createdAt = new Date();

    const newMerchant = await this.merchantService.createMerchant(hashedInitialPassword, code, createdAt, createMerchantDto);
    return this.mailService.sendEmailNewAccount(newMerchant.companyName, newMerchant.code, initialPassword);
	}

//Get Routes

	@Get('all')
  @UseGuards(RolesGuard)
	@Roles(Role.Admin)
	async getAllMerchants(){
    return (await this.merchantService.getAllMerchants()).map((merchant) => plainToClass(SerializedMerchant, merchant));
	}


	@Get('search')
  @UseGuards(RolesGuard)
	@Roles(Role.Admin)
	async getMerchantByParam(@Query() params: any){
    return (await this.merchantService.getMerchantByParam(params)).map((merchant) => plainToClass(SerializedMerchant, merchant));
	}

  @Get('get/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async getMerchantByCode(@Query('code') code: string){
    return new SerializedMerchant(await this.merchantService.getMerchantByCode(code));
  }

//Patch Routes

	@Patch('changePassword/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Merchant)
	async updateMerchantPassword(@Session() session: Record<string, any>, @Body() updateMerchantPasswordDto: UpdateMerchantPasswordDto){
    const newPassword = updateMerchantPasswordDto.password;
    updateMerchantPasswordDto.password = hashPassword(updateMerchantPasswordDto.password);
    this.merchantService.updateMerchantPassword(session.passport.user.code, updateMerchantPasswordDto);
    const name = session.passport.user.companyName;
    return this.mailService.sendNewPassword(name, newPassword);
	}

	@Patch('changeAddress/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Merchant)
	async updateMerchantAddress(@Session() session: Record<string, any>, @Body() upadeMerchantAddressDto: UpdateUserAddressDto){
    const code = session.passport.user.code;
    return await this.merchantService.updateMerchantAddress(code, upadeMerchantAddressDto);
	}


	@Patch('changeEmail/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Merchant)
	async updateMerchantEmail(@Session() session: Record<string, any>, @Body() updateMerchantEmailDto: UpdateUserEmailDto){
    const code = session.passport.user.code;
    return await this.merchantService.updateMerchantEmail(code, updateMerchantEmailDto);
	}


	@Patch('changePhoneNumber/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Merchant)
	async updateMerchantPhoneNumber(@Session() session: Record<string, any>, @Body() updateMerchantPhoneNumberDto: UpdateMerchantPhoneNumberDto){
    const code = session.passport.user.code;
    return await this.merchantService.updateMerchantPhoneNumber(code, updateMerchantPhoneNumberDto);
	}

  @Patch('resetPassword')
  @UseGuards(RolesGuard)
	@Roles(Role.Admin)
	async resetCustomerPassword(@Query('code') code: string){
    const merchant = await this.merchantService.getMerchantByCode(code);
    const name = merchant.companyName;
    const newGeneratedPassword = this.appService.generateRandom(32, true, true, true, false, false);
    const resetCustomerPassword = hashPassword(newGeneratedPassword);
    await this.merchantService.resetMerchantPassword(code, resetCustomerPassword);
    return this.mailService.sendResetPassword(name, newGeneratedPassword);
	}

//Delete Routes

	@Delete('delete/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Merchant)
	async deleteMerchant(@Session() session: Record<string, any>){
    const code = session.passport.user.code;
    await this.merchantService.deleteMerchant(code);
	}

}
