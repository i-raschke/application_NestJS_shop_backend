import { Exclude } from "class-transformer";
import { Role } from "../../utils/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";






@Entity({name: 'admin'})
export class AdminEntity extends UserEntity{
		

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({nullable: true})
	telephoneNumber: string;

	@Exclude()
	@Column({
		type: 'enum',
		enum: Role,
		default: Role.Admin
	})
	readonly role: Role;



}