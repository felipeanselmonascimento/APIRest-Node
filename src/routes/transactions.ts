import { FastifyInstance } from "fastify";
import { knex } from "../database";

export async function transactionsRoutes(app: FastifyInstance) {

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


}

