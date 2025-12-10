import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
     try {

          const { searchParams } = new URL(request.url);
          const userId = searchParams.get('userId');
          if (!userId) {
               return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
          }

          const user_acc = await prisma.bank.findFirst({
               where: {
                    userId: userId
               }
          })

          if (!user_acc) {
               return NextResponse.json({ error: 'User not found or no balance available' }, { status: 404 });
          }
          if(user_acc.balance === 0) { 
               return NextResponse.json({ error: 'No balance available' }, { status: 400 });
          }
          return NextResponse.json({ balance: user_acc.balance });
     } catch (e) {
          console.log({ e });
          return NextResponse.json({ error: 'Internal Server Error', e }, { status: 500 });
     }
}