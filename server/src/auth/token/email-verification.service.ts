import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { isEmail } from "class-validator";
import ejs from "ejs";
import * as fs from "fs";
import path from "path";
import { MailService } from "src/mail/mail.service";
import { HOUR } from "time-constants";
import { Equal, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { VerificationTokenEntity } from "../entities/email-verification.entity";

@Injectable()
export class EmailVerificationService {
	private readonly domain: string;
	private readonly DOMAIN_ENV = "CLIENT_DOMAIN";
	private readonly emailVerificationTemplate;

	constructor(
		@InjectRepository(VerificationTokenEntity)
		private emailVerificationRepo: Repository<VerificationTokenEntity>,
		private readonly mailService: MailService,
		private readonly config: ConfigService,
	) {
		this.domain = this.config.getOrThrow(this.DOMAIN_ENV)!;

		const templatePath = path.join("html", "email-verification.ejs");
		this.emailVerificationTemplate = ejs.compile(
			fs.readFileSync(templatePath, "utf8"),
		);
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
			html: this.emailVerificationTemplate({
				link: confirmLink,
				domain: this.domain,
			}),
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
