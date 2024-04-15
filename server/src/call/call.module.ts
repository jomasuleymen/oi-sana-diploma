import { Module } from "@nestjs/common";
import { SessionModule } from "src/session/session.module";
import { UserModule } from "src/user/user.module";
import { CallController } from "./call.controller";
import { CallGateway } from "./call.gateway";
import { CallService } from "./call.service";

@Module({
	imports: [UserModule, SessionModule],
	providers: [CallGateway, CallService],
	controllers: [CallController],
	exports: [CallService],
})
export class CallModule {}
