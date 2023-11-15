import 'dotenv/config'
import { z } from 'zod'

//o schema e um formato de dado

//process.env e um obj
const envSchema = z.object({
    //quais as variaveis q vo ter na minha aplicacao
    DATABASE_URL: z.string(),
    PORT: z.number().default(3333)
})

export const env = envSchema.parse(process.env)
