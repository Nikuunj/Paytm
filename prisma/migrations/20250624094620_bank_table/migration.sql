-- CreateTable
CREATE TABLE "Bank" (
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bank_userId_key" ON "Bank"("userId");

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
