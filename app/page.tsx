import SignSignOut from "@/components/SignSignOut";
import { getServerSession } from "next-auth";


async function getSession() {
    const session = await getServerSession();
    console.log(session);
    
    return session;
}

export default async function Home() {
    const session = await getSession();
    return (    
        <>
            {JSON.stringify(session)}
            <SignSignOut />
        </> 
    );
}
