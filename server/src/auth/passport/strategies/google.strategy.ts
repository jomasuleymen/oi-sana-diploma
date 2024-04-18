import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "") {
	constructor(
		readonly configService: ConfigService,
		private authService: AuthService,
	) {
		super({
			clientID: configService.getOrThrow("GOOGLE_CLIENT_ID"),
			clientSecret: configService.getOrThrow("GOOGLE_CLIENT_SECRET"),
			callbackURL:
				configService.getOrThrow("DOMAIN") + "/api/auth/callback/google",
			scope: ["email", "profile"],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	): Promise<any> {
		const { email, given_name, family_name, picture } = profile._json;
		const user = await this.authService.validateOAuthUser({
			email,
			firstname: given_name,
			lastname: family_name,
			profileImage: picture,
		});

		done(null, user);
	}
}
