-- CreateEnum
CREATE TYPE "Type" AS ENUM ('success', 'error', 'warn', 'info');

-- CreateTable
CREATE TABLE "New" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "Type" NOT NULL,

    CONSTRAINT "New_pkey" PRIMARY KEY ("id")
);
