import { Exclude } from "class-transformer";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./CustomerEntity";
import { PartialCartEntity } from "./PartialCartEntity";

@Entity({name: 'cart'})
export class CartEntity{
	@PrimaryGeneratedColumn({type: 'bigint'})
  @Exclude()
	id: number;

	@Column({default: 0})
	quantity: number;

	@Column({ type: 'decimal', precision: 10, scale: 2 , default: 0.00})
	totalPrice: number;

	@Column({default: true})
	pending: boolean;

	@Column({default: false})
	paid: boolean;

	@Column()
  @Exclude()
	createdAt: Date;

	@ManyToOne(()=> CustomerEntity, (customer) => customer.cart)
	customer: CustomerEntity;

	@OneToMany(() => PartialCartEntity, (carts) => carts.cart, {cascade: ['insert', 'update'], onDelete: 'CASCADE',onUpdate: 'CASCADE', orphanedRowAction: 'delete'})
	@JoinTable({name: 'carts'})
	carts: PartialCartEntity[];

}