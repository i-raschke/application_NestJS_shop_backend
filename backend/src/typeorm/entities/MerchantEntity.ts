import { Exclude } from "class-transformer";
import { Role } from "../../utils/role.enum";
import { Column, Entity, OneToMany } from "typeorm";
import { ObjectEntity } from "./ObjectEntity";
import { UserEntity } from "./UserEntity";

 @Entity({name: 'merchant'})
 export class MerchantEntity extends UserEntity{
	
	@Column({unique: true})
	companyName: string;

	@Column()
	country: string;
		
	@Column()
	telephoneNumber: string;

	@Exclude()
	@Column({
		type: 'enum',
		enum: Role,
		default: Role.Merchant
	})
	readonly role: Role;

	@OneToMany( () => ObjectEntity, (object) => object.merchant.companyName)
	object: ObjectEntity;




 }