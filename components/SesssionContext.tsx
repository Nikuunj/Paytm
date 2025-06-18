"use client"
import { SessionProvider } from "next-auth/react"

function SesssionContext({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SesssionContext