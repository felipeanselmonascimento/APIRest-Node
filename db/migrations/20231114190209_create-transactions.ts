import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary() //chave primaria
        table.text('title').notNullable() //campo nao pode ficar vazio
        table.decimal('amount', 10, 2).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}

//up oque a migration vai fazer no banco de dados


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions')
}

//down ao contrario do metodo up

