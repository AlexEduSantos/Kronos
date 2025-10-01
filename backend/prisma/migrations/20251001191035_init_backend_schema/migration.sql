-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "backend_schema";

-- CreateEnum
CREATE TYPE "backend_schema"."SchemaStatus" AS ENUM ('Focus', 'Active', 'Finished', 'Cancelled', 'Paused');

-- CreateTable
CREATE TABLE "backend_schema"."Schedule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "testDay" TIMESTAMP(3) NOT NULL,
    "studyStartDate" TIMESTAMP(3) NOT NULL,
    "studyEndDate" TIMESTAMP(3) NOT NULL,
    "status" "backend_schema"."SchemaStatus" NOT NULL DEFAULT 'Active',
    "progress" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backend_schema"."Day" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backend_schema"."Topic" (
    "id" TEXT NOT NULL,
    "dayId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backend_schema"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://www.gravatar.com/avatar/?d=retro&s=200',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backend_schema"."session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_id_key" ON "backend_schema"."Schedule"("id");

-- CreateIndex
CREATE INDEX "Day_scheduleId_idx" ON "backend_schema"."Day"("scheduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Day_scheduleId_date_key" ON "backend_schema"."Day"("scheduleId", "date");

-- CreateIndex
CREATE INDEX "Topic_dayId_idx" ON "backend_schema"."Topic"("dayId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "backend_schema"."User"("email");

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "backend_schema"."session"("expire");

-- AddForeignKey
ALTER TABLE "backend_schema"."Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "backend_schema"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backend_schema"."Day" ADD CONSTRAINT "Day_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "backend_schema"."Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backend_schema"."Topic" ADD CONSTRAINT "Topic_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "backend_schema"."Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;
