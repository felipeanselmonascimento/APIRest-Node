//onde vamos fazer a conexao com o banco de dados
import 'dotenv/config'
import { knex as setupKnex, Knex } from "knex";

if (!process.env.DATABASE_URL) {
    throw new Error('Databse url end not found')
}

export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: process.env.DATABASE_URL
    },
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    }
}

export const knex = setupKnex(config)


// client == banco de dados q estamos usando
// connection precisa ter informacoes sobre nossa conexao