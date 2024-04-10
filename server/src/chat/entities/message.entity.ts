import { User } from "src/user/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
	name: "messages",
})
export class Message {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("varchar")
	roomId: string;

	@ManyToOne(() => User, { onDelete: "CASCADE" })
	sender: User;

	@ManyToOne(() => User, { onDelete: "CASCADE" })
	receiver: User;

	@Column("boolean", { default: false })
	read: boolean;

	@Column("boolean", { default: false })
	delivered: boolean;

	@Column("text")
	content: string;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
}
