import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { CreateObjectDto } from "./CreateObject.dto";

export class UpdateObjectPriceDto extends PickType(CreateObjectDto, ['price'] as const){


  @IsPositive()
	@IsNotEmpty()
	@IsNumber({maxDecimalPlaces: 2})
	price: number;

}