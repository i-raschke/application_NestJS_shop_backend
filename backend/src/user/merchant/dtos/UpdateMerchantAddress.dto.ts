import { IsNotEmpty, IsNumberString, Length, NotEquals } from "@nestjs/class-validator";
import { PickType } from "@nestjs/mapped-types";
import { CreateMerchantDto } from "./CreateMerchant.dto";

export class UpdateMerchantAddressDto extends PickType(CreateMerchantDto, ['address', 'city', 'postcode', 'country'] as const){




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

	@IsNotEmpty()
	@NotEquals(null)
	country: string;


}