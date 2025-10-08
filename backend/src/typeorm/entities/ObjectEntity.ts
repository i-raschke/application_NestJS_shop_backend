import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MerchantEntity } from "./MerchantEntity";
import { PartialCartEntity } from "./PartialCartEntity";

@Entity({name: 'object'})
export class ObjectEntity{
	@PrimaryGeneratedColumn({type: 'bigint'})
  @Exclude()
	id: number;

	@Column()
	object: string;

	@Column({unique: true})
	objectNumber: string;

	@Column({ type: 'decimal', precision: 10, scale: 2})
	price: number;

	@Column()
	color: string;

	@Column({type: 'integer'})
	amount: number;

	@Column({default: false})
	available: boolean;

	@Column()
  @Exclude()
	createdAt: Date;


	@ManyToOne(() => MerchantEntity, (merchant) => merchant.object)
  @Exclude()
	merchant: MerchantEntity;

	@OneToMany(()=> PartialCartEntity, (carts) => carts.object)
  @Exclude()
	carts: PartialCartEntity;

		
}
