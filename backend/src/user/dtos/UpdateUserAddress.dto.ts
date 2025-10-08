import { IsNotEmpty, IsNumberString, Length, NotEquals } from "@nestjs/class-validator";
import { PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./CreateUser.dto";

export class UpdateUserAddressDto extends PickType(CreateUserDto,['address', 'city', 'postcode'] as const){


		
	@IsNotEmpty()
	@NotEquals(null)
	address: string;

	@IsNotEmpty()
	@NotEquals(null)
	@IsNumberString()
	@Length(5)
	postcode: string;

	@IsNotEmpty()
	@NotEquals(null)
	city: string;


}
