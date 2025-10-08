import { IsDefined, IsEmail, IsNotEmpty, IsOptional } from "@nestjs/class-validator";
import { IsNumberString, Length, NotEquals, ValidateIf } from "class-validator";


export class CreateUserDto {



	@IsNotEmpty()
	@IsEmail()
	@NotEquals(null)
	email: string;

	@IsNotEmpty()
	@NotEquals(null)
	address: string;

	//@IsPostalCode()
	@IsNotEmpty()
	@IsNumberString()
	@NotEquals(null)
	@Length(5)
	postcode: string;

	@IsNotEmpty()
	@NotEquals(null)
	city: string;

	@IsOptional()
	//@IsMobilePhone()
	@IsNumberString()
	mobileNumber: string;
		

	@ValidateIf(obj => ((obj.mobileNumber === undefined) && (obj.telephoneNumber === undefined)))
	@IsDefined()
	private readonly checkTelephoneMobileNumber: undefined;
}
