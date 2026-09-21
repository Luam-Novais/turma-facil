/*
  Warnings:

  - You are about to alter the column `monthly_price` on the `ClassGroup` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(10,2)`.
  - Changed the type of `status` on the `Enrollment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "STATUS_ENROLLMENT" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELED');

-- CreateEnum
CREATE TYPE "STATUS_MONTHLY_FEE" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELED');

-- AlterTable
ALTER TABLE "ClassGroup" ALTER COLUMN "monthly_price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "status",
ADD COLUMN     "status" "STATUS_ENROLLMENT" NOT NULL;

-- CreateTable
CREATE TABLE "Monthly_fee" (
    "id" SERIAL NOT NULL,
    "enrollment_id" INTEGER NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "status" "STATUS_MONTHLY_FEE" NOT NULL,
    "payment_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Monthly_fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "description" VARCHAR(200),
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Monthly_fee_payment_id_key" ON "Monthly_fee"("payment_id");

-- AddForeignKey
ALTER TABLE "Monthly_fee" ADD CONSTRAINT "Monthly_fee_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monthly_fee" ADD CONSTRAINT "Monthly_fee_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
