-- CreateEnum
CREATE TYPE "public"."SchemaStatus" AS ENUM ('Focus', 'Active', 'Finished', 'Cancelled', 'Paused');

-- AlterTable
ALTER TABLE "public"."Schedule" ADD COLUMN     "status" "public"."SchemaStatus" NOT NULL DEFAULT 'Active';
