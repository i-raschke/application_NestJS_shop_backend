import { IsInt, IsNotEmpty } from "class-validator";

export class InputPartialCartDto{
	@IsNotEmpty()
	objectNumber: string;

	@IsNotEmpty()
	@IsInt()
	quantity: number;
}