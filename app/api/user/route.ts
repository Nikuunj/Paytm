import { putRequestUser } from "@/types/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prisma from "@/db";

export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('id');
        const reqBody = await request.json();
        const validate = putRequestUser.safeParse(reqBody);

        if(!userId) {
            return NextResponse.json({ message: 'Please provide user id' }, { status: 403 })
        }

        if(!validate.success) {
            return NextResponse.json({ message: 'Please provide valid input', Error: validate.error.issues[0].message }, { status: 403 })
        }


        const { first_name, last_name, password } = reqBody;
        const hashPass = bcrypt.hashSync(password, 10);

        const updateUser = await prisma.user.update({
            where: {
                id: userId,
            }, 
            data: {
                first_name,
                last_name,
                password: hashPass
            }
        })

        if(!updateUser) {
            return NextResponse.json({ message: "Error while updating information" }, { status: 411 });
        }
        return NextResponse.json({ message: "Updated successfully" });
    } catch (e) {   
        console.log({ e });
        return NextResponse.json({ message: "Error while updating information", e }, { status: 500 });
    }
}