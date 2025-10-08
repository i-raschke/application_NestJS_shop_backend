import { IsNotEmpty } from "class-validator";

export class LoginDto{
	@IsNotEmpty()
	code: string;

	@IsNotEmpty()
	password: string;
}