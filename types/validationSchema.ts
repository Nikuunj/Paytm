import z from 'zod'

export const userSchema = z.object({
    email: z.string().email(),
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    password: z.string().min(5),
})

export const loginUser = userSchema.pick({
    email: true,
    password: true,
})

export const putRequestUser = userSchema.pick({
    first_name: true,
    last_name: true,
    password: true
})