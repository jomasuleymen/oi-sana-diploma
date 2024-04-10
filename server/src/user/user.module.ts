import { Module } from "@nestjs/common";
import { SessionModule } from "src/session/session.module";
import { UserController } from "./user.controller";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([User]), SessionModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [TypeOrmModule, UserService],
})
export class UserModule {}
