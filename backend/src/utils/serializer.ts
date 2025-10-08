import { Exclude, Transform } from "class-transformer";
import { CustomerEntity, MerchantEntity, ObjectEntity } from "../typeorm/entitiesIndex";
import { Role } from "./role.enum";




export class SerializedUser{
	@Exclude()
	id: number;

	@Exclude()
	code: string;

	@Exclude()
	email: string;

	address: string;
	postcode: string;
	city: string;

	@Exclude()
	telephoneNumber: string;

	@Exclude()
	mobileNumber: string;

	@Exclude()
	password: string;

	@Exclude()
	createdAt: Date;

	@Exclude()
	role: Role;

	constructor(partial: Partial<SerializedUser>){
		Object.assign(this, partial);
	}

}

export class SerializedAdmin extends SerializedUser{

	firstName: string;
	lastName: string;
	
}


export class SerializedCustomer extends SerializedUser{
		

	firstName: string;
	lastName: string;

	@Transform(({value}) => (value.object + ' ' + value.companyName))
	@Exclude()
	object: ObjectEntity;


}

export class SerializedMerchant extends SerializedUser{

	companyName: string;
	
	email: string;

	country: string;

	@Exclude()
	mobileNumber: string;

	@Exclude()
	telephoneNumber: string;

	@Exclude()
	password: string;

	@Exclude()
	createdAt: Date;

	@Transform(({value}) => value.object)
	@Exclude()
	object: ObjectEntity;

}



export class SerializedObject{

	@Exclude()
	id: number;

	object: string;
	objectNumber: string;
	price: number;
	color: string;
	amount: number;

  @Exclude()
	available: boolean;

	@Exclude()
	createdAt: Date;

	@Transform(({value}) => value.companyName)
  @Exclude()
	merchant: MerchantEntity;

	@Transform(({value}) => (value.firstName + ' ' + value.lastName))
  @Exclude()
	customer: CustomerEntity;


	constructor(partial: Partial<SerializedObject>){
		Object.assign(this, partial);
	}

}



