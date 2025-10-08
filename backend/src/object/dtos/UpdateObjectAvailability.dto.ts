import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { CreateObjectDto } from "./CreateObject.dto";

export class UpdateObjectAvailabilityDto extends PickType(CreateObjectDto, ['available'] as const){


	@IsNotEmpty()
	available: boolean;


}