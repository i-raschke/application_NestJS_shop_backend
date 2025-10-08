import { Exclude } from "class-transformer";
import { Role } from "../../utils/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./CartEntity";
import { UserEntity } from "./UserEntity";





@Entity({name: 'customer'})
export class CustomerEntity extends UserEntity{

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({nullable: true})
	telephoneNumber: string;
	
	@Column({
		type: 'enum',
				enum: Role,
				default: Role.Customer
	})
  @Exclude()
	readonly role: Role;


	@OneToMany(() => CartEntity, (cart) => cart.customer)
  @Exclude()
	cart: CartEntity;




}