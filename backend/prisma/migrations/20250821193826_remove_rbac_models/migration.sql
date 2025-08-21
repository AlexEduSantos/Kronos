/*
  Warnings:

  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermissionToRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PermissionToRole" DROP CONSTRAINT "_PermissionToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PermissionToRole" DROP CONSTRAINT "_PermissionToRole_B_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "roleId";

-- DropTable
DROP TABLE "public"."Permission";

-- DropTable
DROP TABLE "public"."Role";

-- DropTable
DROP TABLE "public"."_PermissionToRole";
