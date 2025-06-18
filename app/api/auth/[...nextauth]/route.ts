import prisma from "@/db";
import { userSchema } from "@/types/validationSchema";
import { passwordMatch } from "@/utils/passwordmatch";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { threadId } from "worker_threads";




const handler =  NextAuth({
     providers: [
          CredentialsProvider({
               name: 'email',
               credentials: {
                         email: { label: 'Email', type: 'text', placeholder: 'Email' },
                         password: { label: 'Password', type: 'password', placeholder: 'Password' },
               },
               async authorize(credentials) {
                    if (!credentials) return null;
                    try {
                         const validate = userSchema.safeParse(credentials);

                         if(!validate.success) {
                              console.log(validate.error);
                              return null;
                         }

                         const user = await prisma.user.findUnique({
                              where: {
                                   email: credentials.email
                              }
                         })
                         if(!user) throw new Error('User not found');

                         const match = await passwordMatch(user.password, credentials.password)
                         
                         if(!match) throw new Error('Password Incorrect')
                         
                         return {
                              id: credentials.email,
                              name: user.first_name + "," + user.last_name,
                              email: credentials.email
                         };
                    } catch(e) {
                         console.error(e);
                         return null;
                    }
               },
          })
    ],
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }

