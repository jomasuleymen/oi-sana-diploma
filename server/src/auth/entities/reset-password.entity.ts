import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
	name: "reset_password_tokens",
})
@Unique("unique_email_reset_token", ["email", "token"])
@Index("index_email_reset_token", ["email", "token"])
export class ResetPasswordEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", nullable: false })
	email: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	token: string;

	@Column({ type: "timestamp", nullable: false })
	expires: Date;
}
