import prisma from "@/db";

export const transferFunds = async (fromUserId: string, toUserId: string, amount: number) => {
     if (amount <= 0) {
          throw new Error("Amount must be greater than zero");
     }

     return await prisma.$transaction(async (tx) => {
          const userFrom = await tx.bank.findFirst({
               where: { userId: fromUserId },
          });

          if (!userFrom) {
               throw new Error("Sender not found");
          }

          if (userFrom.balance < amount) {
               throw new Error("Insufficient balance");
          }

          const userTo = await tx.bank.findFirst({
               where: { userId: toUserId },
          });

          if (!userTo) {
               throw new Error("Receiver not found");
          }

          await tx.bank.update({
               where: { userId: userFrom.userId },
               data: { balance: userFrom.balance - amount },
          });

          // Add to receiver
          await tx.bank.update({
               where: { userId: userTo.userId },
               data: { balance: userTo.balance + amount },
          });
          return { success: true, message: "Transfer complete" };
     });
};
