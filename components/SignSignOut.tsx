"use client"
import { signIn, signOut } from "next-auth/react"

function SignSignOut() {
  return (
    <div>
          <br /><br />
          <button type="button" onClick={() => signIn()}>sign in</button>
          <br /><br />
          <button type="button" onClick={() => signOut()}>sign out</button>
          <br /><br />
     </div>
  )
}

export default SignSignOut