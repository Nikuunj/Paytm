import prisma from "@/db";
import { passwordMatch } from "@/utils/passwordmatch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const otpId = searchParams.get('otpid');
        if(!otpId) throw new Error('OTP id not provided');

        const { otp } = await request.json();
        const otp_object = await prisma.otp.findUnique({
            where: {
                id: otpId
            }
        })
        if(!otp_object) throw new Error('Object not found');

        const match = await passwordMatch(otp_object.otp, otp)

        if(!match) throw new Error('OTP not match');
    
        const user_new = await prisma.user.create({
            data: {
                first_name: otp_object.first_name,
                last_name: otp_object.last_name,
                email: otp_object.email,
                password: otp_object.password
            }
        })
        await prisma.otp.delete({
            where: {
                id: otpId
            }
        })
        return NextResponse.json({ message: "success" });
    } catch (e) {
        console.log({ e });
        return NextResponse.json({ error: 'Internal Server Error', e }, { status: 500 });
    }
}