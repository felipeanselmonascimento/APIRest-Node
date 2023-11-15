//criar arquivo de configuracoes do TS

import fastify from "fastify";
import { knex } from "./database";
import crypto from "node:crypto"
import { env } from "./env";

const app = fastify()

app.get('/hello', async () => {
    const transaction = await knex('transaction').insert(
        {
            id: crypto.randomUUID(),
            title: 'Transacao de Teste',
            amount: 1000
        }
    ).returning('*')

    return transaction
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('Server Running')
})