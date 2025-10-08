import { CreateAdminDto } from "../../../user/admin/dtos/CreateAdmin.dto";
import { AdminEntity } from "../../../typeorm/entitiesIndex";
import { UpdateAdminPasswordDto } from "../../../user/admin/dtos/UpdateAdminPassword.dto";
import { UpdateUserAddressDto } from "../../../user/dtos/UpdateUserAddress.dto";
import { UpdateAdminPhoneNumberDto } from "../../../user/admin/dtos/UpdateAdminPhoneNumber.dto";
import { UpdateUserEmailDto } from "../../../user/dtos/UpdateUserEmail";


export const mockAdmin = new AdminEntity();
mockAdmin.id = 1;
mockAdmin.code = 'A7-6 ';
mockAdmin.firstName = 'Ada';
mockAdmin.lastName = 'Lovelace';
mockAdmin.email = 'Lovelace@gmail.com';
mockAdmin.address = 'Ada-Lovelace-Straße 17';
mockAdmin.postcode = '63457';
mockAdmin.city = 'Göttingen';
mockAdmin.mobileNumber = '06181261291';
mockAdmin.telephoneNumber = '016310121815';
mockAdmin.password = '$2b$10$ysFMcKVBbnMFLsOpy3bbr.gdowuw6zlBBmAzyTD/ewGxqTZi5tQjy';


export const mockCreateAdminDto = new CreateAdminDto();
mockCreateAdminDto.firstName = 'Ada';
mockCreateAdminDto.lastName = 'Lovelace';
mockCreateAdminDto.email = 'Lovelace@gmail.com';
mockCreateAdminDto.address = 'Ada-Lovelace-Straße 17';
mockCreateAdminDto.postcode = '63457';
mockCreateAdminDto.city = 'Göttingen';
mockCreateAdminDto.mobileNumber = '06181261291';
mockCreateAdminDto.telephoneNumber = '016310121815';

export const mockUpdateAdminPasswordDto = new UpdateAdminPasswordDto();
mockUpdateAdminPasswordDto.password = 'BKwGU5XdACaU8WW0QvAoEhhBhrAB0Uzt';

export const mockUpdateAdminAddressDto = new UpdateUserAddressDto()
mockUpdateAdminAddressDto.address = 'Ada-Lovelace-Straße 19';
mockUpdateAdminAddressDto.city = 'Göttingen';
mockUpdateAdminAddressDto.postcode = '37075';

export const mockUpdateAdminPhoneNumberDto = new UpdateAdminPhoneNumberDto();
mockUpdateAdminPhoneNumberDto.mobileNumber = '06181261292';

export const mockUpdateAdminEmailDto = new UpdateUserEmailDto();
mockUpdateAdminEmailDto.email = 'Lovelace@web.de';

export const mockUpdatedAdmin = new AdminEntity();
mockUpdatedAdmin.code = 'A7-6 ';
mockUpdatedAdmin.firstName = 'Ada';
mockUpdatedAdmin.lastName = 'Lovelace';
mockUpdatedAdmin.email = 'Lovelace@gmail.com';
mockUpdatedAdmin.address = 'Ada-Lovelace-Straße 19';
mockUpdatedAdmin.postcode = '37075';
mockUpdatedAdmin.city = 'Göttingen';
mockUpdatedAdmin.mobileNumber = '06181261291';
mockUpdatedAdmin.telephoneNumber = '016310121815';
mockUpdatedAdmin.password = 'BKwGU5XdACaU8WW0QvAoEhhBhrAB0Uzt';

export const mockSessionAdmin = {passport: { user: {code: mockAdmin.code, role: 'admin'} }};
export const mockSessionWrongRole = {passport: { user: {code: 'somecode', role: 'customer'} }};