import { DataSource } from 'typeorm'
import 'dotenv/config'

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: 5432,
    username: 'root',
    password: '123456',
    database: 'personal_bank',
    migrations: ["src/database/migrations/*.ts"],
    entities: ["src/modules/**/entities/*.ts"],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource