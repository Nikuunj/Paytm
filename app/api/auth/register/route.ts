 import prisma from "@/db";
import { userSchema } from "@/types/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { generateNumericOTP } from "@/utils/generateOpt";
import nodemailer from 'nodemailer';


export async function POST(request: NextRequest) {
     try {
          const reqData  = await request.json();
          const valid = userSchema.safeParse(reqData);

          if(!valid.success) {
               return NextResponse.json({ message: 'Please provide valid input', Error: valid.error.issues[0].message }, { status: 403 })
          }

          const { email, first_name, last_name, password } = reqData;
          const hashPass = bcrypt.hashSync(password, 10);
          const randomNumber = generateNumericOTP(6)
          const hashOtp = bcrypt.hashSync(randomNumber.toString(), 10)

          const transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                    user: process.env.APP_EMAIL,
                    pass: process.env.APP_PASSWORD
               }
          });
          

          const mailOptions = {
               from: 'Paytm Varification Code <mnikunj449@gmail.com>', 
               to: email, 
               subject: 'Test mail', 
               html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                         <h2 style="color: #333;">Hi ${first_name},</h2>
                         <p style="font-size: 1em; color: #555;">Thanks for signing up! Your verification code is:</p>
                         <div style="font-size: 24px; font-weight: bold; color: #2c3e50; margin: 20px 0;">${randomNumber}</div>
                         <p style="font-size: 0.9em; color: #777;">Please enter this code to verify your email address.</p>
                         <hr style="margin: 30px 0;">
                    </div>
               `,
          };

          
          const otp_create = await prisma.otp.create({
               data: {
                    otp: hashOtp,
                    email,
                    first_name,
                    last_name,
                    password: hashPass
               }
          })
          
          await transporter.sendMail(mailOptions)
          return NextResponse.json({ message: 'sucusses', otp_create });
     } catch (e) {
          console.error(e);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
     }
}