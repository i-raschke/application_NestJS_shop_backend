import { IsNotEmpty,  } from "@nestjs/class-validator";
import { MaxLength, MinLength } from "class-validator";

export class UpdateMerchantPasswordDto{

		
	id: number;
	code: string;
	companyName: string;
	email: string;
	address: string;
	postcode: string;
	city: string;
	country: string;
	telephoneNumber: string;
	mobileNumber: string;


	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(32)
	password: string;

		
	createdAt: Date;




}