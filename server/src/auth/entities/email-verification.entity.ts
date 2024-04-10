import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({
	name: "verification_tokens",
})
@Unique("unique_email_ver_token", ["email", "token"])
@Index("index_email_ver_token", ["email", "token"])
export class VerificationTokenEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", nullable: false })
	email: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	token: string;

	@Column({ type: "timestamptz", nullable: false })
	expires: Date;
}
