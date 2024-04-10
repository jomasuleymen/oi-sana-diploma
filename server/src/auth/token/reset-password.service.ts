import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { isEmail } from "class-validator";
import { MailService } from "src/mail/mail.service";
import { HOUR } from "time-constants";
import { Equal, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { ResetPassword } from "../entities/reset-password.entity";

@Injectable()
export class ResetPasswordTokenService {
	private domain: string;
	private DOMAIN_ENV = "CLIENT_DOMAIN";

	constructor(
		@InjectRepository(ResetPassword)
		private resetPasswordRepo: Repository<ResetPassword>,
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

	private createResetPasswordToken = async (email: string) => {
		await this.resetPasswordRepo.delete({ email: Equal(email) });
		const { token, expires } = this.generateToken();

		const tokenDTO = { email, expires, token };

		return await this.resetPasswordRepo.save(tokenDTO);
	};

	public sendResetPasswordToken = async (email: string) => {
		if (!isEmail(email)) throw new Error("Email is required!");

		const tokenEntity = await this.createResetPasswordToken(email);
		const confirmLink = this.getConfirmLink(tokenEntity.token);

		await this.mailService.sendMail({
			to: tokenEntity.email,
			subject: "Reset password",
			html: `<p>Click <a href="${confirmLink}">here</a> to reset password.</p>`,
		});
	};

	public checkAndGetEmail = async (token: string): Promise<string> => {
		const tokenEntity = await this.resetPasswordRepo.findOneBy({
			token: Equal(token),
		});
		if (!tokenEntity) throw new BadRequestException("Token does not exist!");

		const hasExpired = new Date(tokenEntity.expires) < new Date();
		if (hasExpired) throw new BadRequestException("Token has expired!");

		await this.resetPasswordRepo.delete({ id: Equal(tokenEntity.id) });
		return tokenEntity.email;
	};

	private getConfirmLink = (token: string) => {
		return `${this.domain}/auth/reset-password?token=${token}`;
	};
}
