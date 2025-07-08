import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const filter = searchParams.get('filter');

        const findUser = await prisma.user.findMany({
            where: {
                first_name: {
                    contains: filter || '',
                }, 
                last_name: {
                    contains: filter || '',
                }
            },
        });

        if (!findUser || findUser.length === 0) {
            return NextResponse.json({ users: [] });
        }
        return NextResponse.json({ users : findUser.map(user => ({
                firstName: user.first_name,
                lastName: user.last_name,
                id :user.id,
                username: user.email,
            })) 
        });
    } catch (e) {
        console.log({ e });
        return NextResponse.json({ error: 'Internal Server Error', e }, { status: 500 });
    }
}