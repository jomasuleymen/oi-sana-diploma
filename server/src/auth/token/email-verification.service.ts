import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { MailService } from "src/mail/mail.service";
import { HOUR } from "time-constants";
import { Equal, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { VerificationTokenEntity } from "../entities/email-verification.entity";
import { isEmail } from "class-validator";

@Injectable()
export class EmailVerificationService {
	private domain: string;
	private DOMAIN_ENV = "CLIENT_DOMAIN";

	constructor(
		@InjectRepository(VerificationTokenEntity)
		private emailVerificationRepo: Repository<VerificationTokenEntity>,
		private readonly mailService: MailService,
		private readonly config: ConfigService,
	) {
		this.domain = this.config.getOrThrow(this.DOMAIN_ENV)!;
	}

	private generateToken = () => {
		const token = uuidv4();
		const expires = new Date(Date.now() + HOUR);

		return { token, expires };
	};

	private createVerificationToken = async (email: string) => {
		await this.emailVerificationRepo.delete({ email: Equal(email) });
		const { token, expires } = this.generateToken();

		const tokenDTO = { email, expires, token };

		return await this.emailVerificationRepo.save(tokenDTO);
	};

	public sendEmailVerificationToken = async (email: string) => {
		if (!isEmail(email)) throw new Error("Email is required!");

		const tokenEntity = await this.createVerificationToken(email);
		const confirmLink = this.getConfirmLink(tokenEntity.token);

		await this.mailService.sendMail({
			to: tokenEntity.email,
			subject: "Confirm your email",
			html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
		});
	};

	public checkAndGetEmail = async (token: string): Promise<string> => {
		const tokenEntity = await this.emailVerificationRepo.findOneBy({
			token: Equal(token),
		});
		if (!tokenEntity) throw new BadRequestException("Token does not exist!");

		await this.emailVerificationRepo.delete({ id: Equal(tokenEntity.id) });

		const hasExpired = new Date(tokenEntity.expires) < new Date();
		if (hasExpired) throw new BadRequestException("Token has expired!");

		return tokenEntity.email;
	};

	private getConfirmLink = (token: string) => {
		return `${this.domain}/auth/email-verification?token=${token}`;
	};
}
