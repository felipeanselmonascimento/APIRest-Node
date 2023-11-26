import { expect, test, beforeAll, afterAll } from "vitest"
import { app } from "../src/app" // acesso ao servidor sem subir uma aplicacao
import request from "supertest"

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

// antes de fazer os testes assegurar q app ja terminou de carregar todos os plugins

test('user is able to create a new transaction',  async () => {

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