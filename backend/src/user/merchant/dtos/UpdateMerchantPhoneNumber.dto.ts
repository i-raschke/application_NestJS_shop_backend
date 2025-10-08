import { PickType } from "@nestjs/mapped-types";
import { IsDefined, IsNumberString, IsOptional, NotEquals, ValidateIf } from "class-validator";
import { CreateMerchantDto } from "./CreateMerchant.dto";

export class UpdateMerchantPhoneNumberDto  extends PickType(CreateMerchantDto, ['telephoneNumber','mobileNumber'] as const){


    
  //@IsPhoneNumber()
  @NotEquals(null) 
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
