import { PickType } from "@nestjs/mapped-types";
import { IsDefined, IsNotEmpty, IsNumber, Min } from "class-validator";
import { CreateObjectDto } from "./CreateObject.dto";
import { IsOptional } from "@nestjs/class-validator";

export class UpdateObjectAmountDto extends PickType(CreateObjectDto, ['amount', 'available'] as const){


  @IsNotEmpty()
	@IsDefined()
  @IsNumber({maxDecimalPlaces: 0})
	@Min(0)
	amount: number;

	@IsNotEmpty()
  @IsOptional()
	available: boolean;


}