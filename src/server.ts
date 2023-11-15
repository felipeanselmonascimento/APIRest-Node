//criar arquivo de configuracoes do TS

import fastify from "fastify";
import { knex } from "./database";
import crypto from "node:crypto"

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
    port: 3333,
}).then(() => {
    console.log('Server Running')
})