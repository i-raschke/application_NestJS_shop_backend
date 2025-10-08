import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseInterceptors, ClassSerializerInterceptor, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/CreateAdmin.dto';
import { UpdateAdminPasswordDto } from './dtos/UpdateAdminPassword.dto';
import { UpdateUserEmailDto } from '../dtos/UpdateUserEmail';
import { AppService } from '../../app.service';
import { MailService } from '../../mail/mail.service';
import { hashPassword } from '../../utils/bcrypt';
import { Roles } from '../../utils/roles.decorator';
import { Role } from '../../utils/role.enum';
import { RolesGuard } from '../../utils/roles.guard';
import { UpdateUserAddressDto } from '../dtos/UpdateUserAddress.dto';
import { UpdateAdminPhoneNumberDto } from './dtos/UpdateAdminPhoneNumber.dto';
import { plainToClass } from 'class-transformer';
import { SerializedAdmin } from '../../utils/serializer';

@Controller('admin')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ){}

//Post Routes

  @Post('registration')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async createAdmin(@Body() createAdminDto: CreateAdminDto, @Session() session: Record<string, any>) {
    if(session.passport.user.role = 'admin'){
      const initialPassword = this.appService.generateRandom(32, true, true, true, false, false);
      const hashedPassword = hashPassword(initialPassword);
      const code = this.appService.generateRandom(4, true, true, false, '-', '-');
      const createdAt = new Date();
      
      const newAdmin = await this.adminService.createAdmin(hashedPassword, code, createdAt, createAdminDto);
      const name = newAdmin.firstName + ' ' + newAdmin.lastName;
      this.mailService.sendEmailNewAccount(name, newAdmin.code, initialPassword);
      return newAdmin;
    }
    else{
      return 'Invalid Request';
    }
    
  }

//Get Routes

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async getAllAdmins() {
    return (await this.adminService.getAllAdmins()).map((admin) => plainToClass(SerializedAdmin, admin));
  }


  @Get('get/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async getAdminByCode(@Param('code') code: string) {
    return new SerializedAdmin(await this.adminService.getAdminByCode(code));
  }

//Patch Routes

  @Patch('changePassword/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async updateAdminPassword(@Session() session: Record<string, any>, @Body() updateAdminPasswordDto: UpdateAdminPasswordDto) {
    const newPassword = updateAdminPasswordDto.password;
    updateAdminPasswordDto.password = hashPassword(updateAdminPasswordDto.password);
    const test = await this.adminService.updateAdminPassword(session.passport.user.code, updateAdminPasswordDto);
    const name = session.passport.user.firstName + ' ' + session.passport.user.lastName;
    return this.mailService.sendNewPassword(name, newPassword);
  }

  @Patch('changeAddress/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async updateAdminAddress(@Session() session: Record<string, any>, @Body() updateAdminAddressDto: UpdateUserAddressDto){
    return this.adminService.updateAdminAddress(session.passport.user.code, updateAdminAddressDto); 
  }

  @Patch('changePhoneNumber/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async updateAdminPhoneNumber(@Session() session: Record<string, any>, @Body() updateAdminPhoneNumberDto: UpdateAdminPhoneNumberDto){
    return this.adminService.updateAdminPhoneNumber(session.passport.user.code, updateAdminPhoneNumberDto);
  }


  @Patch('changeEmail/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async updateAdminEmail(@Session() session: Record<string, any>, @Body() updateAdminEmailDto: UpdateUserEmailDto){
    return this.adminService.updateAdminEmail(session.passport.user.code, updateAdminEmailDto);
  }

  @Patch('resetPassword')
  @UseGuards(RolesGuard)
	@Roles(Role.Admin)
	async resetAdminPassword(@Query('code') code: string){
    const admin = await this.adminService.getAdminByCode(code);
    const name = admin.firstName + ' ' + admin.lastName;
    const newGeneratedPassword = this.appService.generateRandom(32, true, true, true, false, false);
    const resetCustomerPassword = hashPassword(newGeneratedPassword);
    await this.adminService.resetAdminPassword(code, resetCustomerPassword);
    return this.mailService.sendResetPassword(name, newGeneratedPassword);
	}

//Delete Routes

  @Delete('delete/:code')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteAdmin(@Session() session: Record<string, any>) {
    return this.adminService.deleteAdmin(session.passport.user.code);
  }
}
