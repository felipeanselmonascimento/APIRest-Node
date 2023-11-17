//somente codigo typescript
import { Knex } from 'knex'

declare module 'knex/types/tables' {
    export interface Tables {
        transactions: {
            id: string
            title: string
            amount: number
            created_at: string
            session_id?: string
        }
    }
}

//vamos falar qual tabela existe no nosso banco de dados