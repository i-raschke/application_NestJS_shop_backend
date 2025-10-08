import { ISession } from "connect-typeorm/out";
import { Column, DeleteDateColumn, Entity, Index, PrimaryColumn } from "typeorm";


@Entity({name: 'session'})
export class SessionEntity implements ISession{
	@Index()
	@Column('bigint')
	public expiredAt = Date.now();

	@PrimaryColumn('varchar', {length: 255})
	id = '';

	@Column('text')
	json = '';

	@DeleteDateColumn({type: 'timestamp', nullable: true})
	destroyedAt?: Date;

		

}