//onde vamos fazer a conexao com o banco de dados

import { knex as setupKnex } from "knex";

export const knex = setupKnex({
    client: 'sqlite',
    connection: {
        filename:'./tmp/app.db'
    }
})


// client == banco de dados q estamos usando
// connection precisa ter informacoes sobre nossa conexao