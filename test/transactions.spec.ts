import { expect, test, beforeAll, afterAll, describe, beforeEach } from "vitest"
import { execSync } from 'node:child_process'
import { app } from "../src/app" // acesso ao servidor sem subir uma aplicacao
import request from "supertest"

describe('Transactions routes', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    // antes de fazer os testes assegurar q app ja terminou de carregar todos os plugins
    // posso usar a funcao it tambem se quiser
    test('user should be able to create a new transaction', async () => {

        //fazer chamada http p/ criar uma nova transacao

        const response = await request(app.server) //servidor do node
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })

        expect(response.statusCode).toEqual(201)
    })

    test('user should be able to list all transaction', async () => {

        //fazer chamada http p/ criar uma nova transacao

        const CreateTransactionResponse = await request(app.server) //servidor do node
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = CreateTransactionResponse.get('Set-Cookie')

        const listTransactionResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        expect(listTransactionResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New Transaction',
                amount: 5000
            })
        ])
    })

    test('user should be able to get a specific transaction', async () => {

        //fazer chamada http p/ criar uma nova transacao

        const CreateTransactionResponse = await request(app.server) //servidor do node
            .post('/transactions')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = CreateTransactionResponse.get('Set-Cookie')

        const listTransactionResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        const transactionId = listTransactionResponse.body.transactions[0].id
        
        const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200)
        
        console.log(getTransactionResponse.body)

        expect(getTransactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'New Transaction',
                amount: 5000
            })
        )
    })

    test('user should be able to get the summary', async () => {

        //fazer chamada http p/ criar uma nova transacao

        const CreateTransactionResponse = await request(app.server) //servidor do node
            .post('/transactions')
            .send({
                title: 'Credit Transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = CreateTransactionResponse.get('Set-Cookie')

        await request(app.server) //servidor do node
            .post('/transactions')
            .set('Cookie', cookies)
            .send({
                title: 'Debit Transaction',
                amount: 2000,
                type: 'debit'
            })

        const summaryResponse = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)
            .expect(200)

        expect(summaryResponse.body.summary).toEqual(
            {
                amount: 3000
            })
        
})
})

//quando oteste executa tem q ter um ambiente zerado inclusive banco de dados por iso o execSync





