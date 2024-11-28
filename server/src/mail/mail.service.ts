import { Global, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

@Global()
@Injectable()
export class MailService {
	private readonly transporter: any;

	constructor(private readonly config: ConfigService) {
		this.transporter = nodemailer.createTransport({
			service: config.getOrThrow("MAIL_SERVICE"),
			host: config.getOrThrow("MAIL_HOST"),
			port: config.getOrThrow("MAIL_PORT"),
			secure: true,
			auth: {
				user: this.config.getOrThrow("MAIL_EMAIL"),
				pass: this.config.getOrThrow("MAIL_PASSWORD"),
			},
		});
	}

	async sendMail(options: Mail.Options) {
		await this.transporter.sendMail({
			...options,
			from: this.config.getOrThrow("MAIL_EMAIL"),
		});
	}
}
