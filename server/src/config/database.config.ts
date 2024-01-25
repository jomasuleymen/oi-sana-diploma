import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dataSource from "datasource";

export const getPostgresConfig = (): TypeOrmModuleOptions => {
	const options = dataSource.options;

	return {
		...options,
	};
};
