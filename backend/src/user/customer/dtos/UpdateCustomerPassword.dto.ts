import { IsNotEmpty,  } from "@nestjs/class-validator";
import { MaxLength, MinLength } from "class-validator";


export class UpdateCustomerPasswordDto{

		
	id: number;
	code: string;
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	postcode: string;
	city: string;
	telephoneNumber: string;
	mobileNumber: string;



	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(32)
	password: string;

		
	createdAt: Date;




}