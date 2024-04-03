import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Alhasgdkyuiodsag27183296ahgajksf",
    database: "productivity",
    entities: ["entities/*.entity.ts"],
    logging: true,
    synchronize: true,
})



