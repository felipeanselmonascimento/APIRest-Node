import { FastifyInstance } from "fastify";
import { z } from "zod"
import crypto, { randomUUID } from "node:crypto"
import { knex } from "../database";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function transactionsRoutes(app: FastifyInstance) {

    app.get('/', { preHandler: [checkSessionIdExists] } ,async (request, reply) => {

        const { session_id } = request.cookies

        const transactions = await knex('transactions')
        .where('session_id', session_id)
        .select()

        return {
            transactions
        }
    })

    app.get ('/:id', { preHandler: [checkSessionIdExists] } ,async (request) => {
        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionsParamsSchema.parse(request.params)

        const { session_id } = request.cookies

        const transaction = await knex('transactions')
        .where('id', id)
        .andWhere('session_id', session_id)
        .first()

        return {
            transaction
        }
    })

    app.get('/summary', { preHandler: [checkSessionIdExists] } ,async (request) => {

        const { session_id } = request.cookies
        const summary = await knex('transactions').sum('amount', { as: 'amount'})
        .where('session_id', session_id)
        .first()

        return {
            summary
        }
    })


    app.post('/', async (request, reply) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })
        
        const { title, amount, type } = createTransactionBodySchema.parse(request.body)
        // validando os dados do request.body vindo da requisacao pra ver se eles batem com o schema q definimos

        let sessionID = request.cookies.session_id

        if (!sessionID) {
            sessionID = randomUUID()

            reply.cookie('session_id', sessionID, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })
        }

        await knex('transactions')
            .insert({
                id: crypto.randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                session_id: sessionID
            })

        reply.status(201).send()

    })


}

//utilizar o zod para validar a requisacao

