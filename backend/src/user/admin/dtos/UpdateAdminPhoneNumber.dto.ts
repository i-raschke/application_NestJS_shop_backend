import { PickType } from "@nestjs/mapped-types";
import { IsDefined, IsNumberString, IsOptional, ValidateIf } from "class-validator";
import { CreateAdminDto } from "./CreateAdmin.dto";

export class UpdateAdminPhoneNumberDto  extends PickType(CreateAdminDto, ['telephoneNumber','mobileNumber'] as const){


    
  @IsOptional()
  //@IsPhoneNumber()
  @IsNumberString()   
  telephoneNumber: string;

  @IsOptional()
  //@IsMobilePhone()
  @IsNumberString()
  mobileNumber: string;

  @ValidateIf(obj => ((obj.mobileNumber === undefined) && (obj.telephoneNumber === undefined)))
  @IsDefined()
  private readonly checkTelephoneMobileNumber: undefined;



    
}
