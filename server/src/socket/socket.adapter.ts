import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from "socket.io";

export class SocketIoAdapter extends IoAdapter {
	constructor(
		readonly app: INestApplication,
		readonly configService: ConfigService,
	) {
		super(app);
	}

	createIOServer(port: number, options?: any) {
		if (!options) options = {};
		const origins = this.configService.get("ORIGINS", "*").split(",");
		options.cors = { origin: origins, credentials: true };
		
		const server = super.createIOServer(port, options) as Server;
		return server;
	}
}
