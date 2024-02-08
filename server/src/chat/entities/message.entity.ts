import { UserEntity } from "src/user/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { RoomEntity } from "./room.entity";

@Entity({
	name: "messages",
})
export class MessageEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => UserEntity)
	sender: UserEntity;

	@ManyToOne(() => RoomEntity, room => room.messages)
	room: RoomEntity;

	@Column("boolean", { default: false })
	read: boolean;

	@Column("boolean", { default: false })
	delivered: boolean;

	@Column("text")
	content: string;

	@CreateDateColumn({ type: "timestamp" })
	createdAt: Date;
}
