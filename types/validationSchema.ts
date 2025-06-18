import z from 'zod'

export const userSchema = z.object({
     email: z.string().email(),
     first_name: z.string().min(3) ,
     last_name: z.string().min(3) ,
     password: z.string().min(5),
})