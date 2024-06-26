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
			service: "Gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			from: config.getOrThrow("MAIL_EMAIL"),
			auth: {
				user: this.config.getOrThrow("MAIL_EMAIL"),
				pass: this.config.getOrThrow("MAIL_PASSWORD"),
			},
		});
	}

	async sendMail(options: Mail.Options) {
		await this.transporter.sendMail(options);
	}
}
