import { IsDefined, IsNumberString, IsOptional, Min, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateObjectDto{
	@IsNotEmpty()
	object: string;

	@IsNotEmpty()
	@IsNumberString()
	objectNumber: string;


  @IsPositive()
	@IsNotEmpty()
	@IsNumber({maxDecimalPlaces: 2})
	price: number;

	@IsNotEmpty()
	color: string;


  @IsNotEmpty()
	@IsDefined()
  @IsNumber({maxDecimalPlaces: 0})
	@Min(0)
	amount: number;

	@IsNotEmpty()
	@IsOptional()
	available: boolean;

  // constructor(object: string, objectNumber: string, price: number, color: string, amount: number, available: boolean){
  //   this.object = object;
  //   this.objectNumber = objectNumber;
  //   this.price = price;
  //   this.color = color;
  //   this.amount = amount;
  //   this.available = available;
  // }

		
}