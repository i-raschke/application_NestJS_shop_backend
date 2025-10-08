import { IsNumber } from "@nestjs/class-validator";
import { IsDecimal, IsInt, IsNotEmpty, NotEquals } from "class-validator";


export class CreateUpdatePartialCartDto{

	@IsNotEmpty()
	@IsNumber()
	@IsInt()
  @NotEquals(0)
	quantity: number;

	@IsNotEmpty()
	@IsNumber()
	@IsDecimal()
	subPrice: number;


}