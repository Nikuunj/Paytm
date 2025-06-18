import z from 'zod'
import { pick } from 'zod/v4-mini'

export const userSchema = z.object({
     email: z.string().email(),
     first_name: z.string().min(3) ,
     last_name: z.string().min(3) ,
     password: z.string().min(5),
})

export const loginUser = userSchema.pick({
  email: true,
  password: true,
})
