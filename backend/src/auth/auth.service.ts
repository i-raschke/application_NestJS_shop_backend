import { Injectable } from '@nestjs/common';
import { AdminService } from '../user/admin/admin.service';
import { CustomerService } from '../user/customer/customer.service';
import { MerchantService } from '../user/merchant/merchant.service';
import { comparePasswords } from '../utils/bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly customerService: CustomerService,
		private readonly merchantService: MerchantService,
		private readonly adminService: AdminService,
	){}

	async validateUser(code: string, password: string): Promise<any>{
		if(code.length === 4){
			const userDB = await this.adminService.getAdminByCode(code);
				
			if (userDB && comparePasswords(password, userDB.password)){
				return userDB;
			}

			else {
				return null;
			}
		}

		if(code.length === 7){
			const userDB = await this.merchantService.getMerchantByCode(code);							
			if (userDB && comparePasswords(password, userDB.password)){
				return userDB;
			}

			else {
				return null;
			}
		}

		if(code.length === 13){
			const userDB = await this.customerService.getCustomerByCode(code);			
		
			if (userDB && comparePasswords(password, userDB.password)){
				return userDB;
			}
			else {
				return null;
			}
		}

				
		else{
			return null;
		}				
	}
		
}
		



