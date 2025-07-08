import { transferFunds } from "@/utils/transferFunds";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
     try {
          const { fromUserId, toUserId, amount } = await request.json();
          if (!fromUserId || !toUserId || !amount) {
               return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
          }
          const tx  = await transferFunds(fromUserId, toUserId, amount);
          return NextResponse.json({ msg: 'Transfer', tx });
     } catch (e) {
          console.log({ e });
          return NextResponse.json({ error: 'Internal Server Error', e }, { status: 500 });
     }
}