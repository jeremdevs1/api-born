import path from "path";
import { ConnectionOptions } from "typeorm";

// @todo: Mettre tes propres infos de la bdd
const databaseConfig: ConnectionOptions = {
    type: "mssql",
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT!, 10) || 1433,
    username: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "MyPass@word",
    database: process.env.DB_NAME || "TestDb",
    entities: [path.join(__dirname + '../../**/**/*.entity{.ts,.js}')],
    synchronize: true,
    logging: true,
    extra: {
      trustServerCertificate: true,
    }
}

export { databaseConfig }