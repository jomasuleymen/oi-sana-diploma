import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
	path:
		{
			production: ".env.production",
			development: ".env.development",
			test: ".env.test",
		}[process.env.NODE_ENV || "development"] || ".env",
});

const dataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: false,
	entities: [path.join(__dirname, "./src/**/*.entity{.ts,.js}")],
	migrations: [path.join(__dirname, "./src/migrations/*{.ts,.js}")],
	migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
