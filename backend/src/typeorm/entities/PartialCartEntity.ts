import { Exclude } from "class-transformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./CartEntity";
import { ObjectEntity } from "./ObjectEntity";

@Entity('partial_cart')
export class PartialCartEntity{
	@PrimaryGeneratedColumn({type: 'bigint'})
  @Exclude()
	id: number;

	@Column()
	quantity: number;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	subPrice: number;

	@ManyToOne(() => CartEntity, (cart) => cart.carts, { onDelete: 'CASCADE', eager: true,})
	cart: CartEntity;


	@ManyToOne(() => ObjectEntity, (object) => object.carts)
	object: ObjectEntity;

}