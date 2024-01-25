import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./passport/strategies/local.strategy";
import { SessionSerializer } from "./passport/session-serializer";

@Module({
	imports: [UserModule, PassportModule.register({ session: true })],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, SessionSerializer],
	exports: [AuthService],
})
export class AuthModule {}
