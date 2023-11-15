//onde vamos fazer a conexao com o banco de dados
import { knex as setupKnex, Knex } from "knex";
import { env } from "./env";

export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: env.DATABASE_URL
    },
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    }
}

export const knex = setupKnex(config)


// client == banco de dados q estamos usando
// connection precisa ter informacoes sobre nossa conexao