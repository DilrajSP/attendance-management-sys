/*
  Warnings:

  - Added the required column `otp` to the `AttendanceSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttendanceSession" ADD COLUMN     "otp" TEXT NOT NULL;
