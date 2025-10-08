import { IsPhoneNumber } from "@nestjs/class-validator";
import { IsNotEmpty, IsNumberString, NotEquals } from "class-validator";
import { CreateUserDto } from "../../../user/dtos/CreateUser.dto";


export class CreateMerchantDto extends CreateUserDto{



	@IsNotEmpty()
	companyName: string;

		
	@IsNotEmpty()
	country: string;


	@IsNumberString()
	//@IsPhoneNumber()
	@NotEquals(null)   
	telephoneNumber: string;




}