import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


const handler =  NextAuth({
     providers: [
          CredentialsProvider({
               credentials: {
                    username: { label: "Username", type: "text", placeholder: "jsmith" },
                    password: { label: "Password", type: "password" }
               },
               async authorize(credentials) {
                    console.log(credentials);
                    
                    return {
                         id: '1',
                         username: credentials?.username,
                    }
               }
          })
     ],
     secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }

