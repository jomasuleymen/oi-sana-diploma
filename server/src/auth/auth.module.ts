import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./passport/strategies/local.strategy";
import { SessionSerializer } from "./passport/session-serializer";
import { MailModule } from "src/mail/mail.module";
import { EmailVerificationService } from "./token/email-verification.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VerificationTokenEntity } from "./entities/email-verification.entity";
import { ResetPasswordEntity } from "./entities/reset-password.entity";
import { ResetPasswordTokenService } from "./token/reset-password.service";
import { GoogleStrategy } from "./passport/strategies/google.strategy";

@Module({
	imports: [
		UserModule,
		MailModule,
		TypeOrmModule.forFeature([VerificationTokenEntity, ResetPasswordEntity]),
		PassportModule.register({ session: true }),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		GoogleStrategy,
		SessionSerializer,
		EmailVerificationService,
		ResetPasswordTokenService,
	],
	exports: [TypeOrmModule, AuthService, EmailVerificationService],
})
export class AuthModule {}
