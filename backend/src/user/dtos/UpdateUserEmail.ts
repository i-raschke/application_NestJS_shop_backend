import { IsEmail, IsNotEmpty, IsOptional } from "@nestjs/class-validator";
import { PickType } from "@nestjs/mapped-types";
import { NotEquals } from "class-validator";
import { CreateUserDto } from "./CreateUser.dto";

export class UpdateUserEmailDto  extends PickType(CreateUserDto, ['email'] as const){



	@IsNotEmpty()
	@IsEmail()
	@NotEquals(null)
	email: string;

		


		
}
