-- DropForeignKey
ALTER TABLE "public"."Topic" DROP CONSTRAINT "Topic_dayId_fkey";

-- AlterTable
ALTER TABLE "public"."Schedule" ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Topic" ADD CONSTRAINT "Topic_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "public"."Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;
