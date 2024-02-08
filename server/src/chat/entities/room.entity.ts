import { UserEntity } from "src/user/entities/user.entity";
import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { MessageEntity } from "./message.entity";

@Entity({
	name: "rooms",
})
export class RoomEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => UserEntity, {
		onDelete: "CASCADE",
		nullable: false,
	})
	@JoinColumn()
	u1: UserEntity;

	@ManyToOne(() => UserEntity, {
		onDelete: "CASCADE",
		nullable: false,
	})
	@JoinColumn()
	u2: UserEntity;

	@OneToMany(() => MessageEntity, message => message.room)
	messages: MessageEntity[];

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;
}
