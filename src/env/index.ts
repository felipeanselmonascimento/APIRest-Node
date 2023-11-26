// import 'dotenv/config' sempre vai importa o arquivo .env
import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV == 'test') {
    config({ path: '.env.test'})
} else {
    config() 
}

//o schema e um formato de dado

//process.env e um obj
const envSchema = z.object({
    //quais as variaveis q vo ter na minha aplicacao
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),                   //node_env diz em qual ambiente a aplicacao ta rodando
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
})

const _env = envSchema.safeParse(process.env)  //safeparse n dispara um erro quando a aplicacao falha

if (_env.success === false) {
    console.error('Invalid Environment variables', _env.error.format())

    throw new Error('Invalid environment variables')
}

//se for e pq falho tem variavel ambiente q nao foi informada correta

export const env = _env.data




