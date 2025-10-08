import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";
import { IsNumberString, NotEquals } from "class-validator";
import { CreateUserDto } from "../../../user/dtos/CreateUser.dto";

export class CreateCustomerDto extends CreateUserDto{
		

	@IsNotEmpty()
	@NotEquals(null)
	firstName: string;

	@IsNotEmpty()
	@NotEquals(null)
	lastName: string;    

	@IsOptional()
	//@IsPhoneNumber()
	@IsNumberString()   
	telephoneNumber: string;


}