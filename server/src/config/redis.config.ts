import { RedisModuleOptions } from "@liaoliaots/nestjs-redis";
import { ConfigService } from "@nestjs/config";

export const getRedisConfig = (config: ConfigService): RedisModuleOptions => {
	return {
		config: {
			host: config.getOrThrow<string>("REDIS_HOST"),
			port: parseInt(config.getOrThrow<string>("REDIS_PORT", "6379")),
			password: config.getOrThrow<string>("REDIS_PASSWORD"),
		},
	};
};
