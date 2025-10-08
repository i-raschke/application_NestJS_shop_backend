import { Exclude } from "class-transformer";
import { Column, PrimaryGeneratedColumn } from "typeorm";


export abstract class UserEntity {
	
	@PrimaryGeneratedColumn({type: 'bigint'})
  @Exclude()
	id: number;

	@Column({unique: true})
  @Exclude()
	code: string;

	@Column({unique: true})
	email: string;

	@Column()
	address: string;

	@Column()
	postcode: string;

	@Column()
	city: string;

	@Column({nullable: true})
	mobileNumber: string;
	
	@Column()
  @Exclude()
	password: string;

	@Column()
  @Exclude()
	createdAt: Date;


}