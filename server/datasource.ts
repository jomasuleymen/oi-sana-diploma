import dotenv from "dotenv";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: false,
	entities: [path.join(__dirname, "src/**/*.entity{.ts,.js}")],
	migrations: [path.join(__dirname, "src/migrations/*{.ts,.js}")],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
