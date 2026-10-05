/*
  Warnings:

  - A unique constraint covering the columns `[enrollment_id,expiration_date]` on the table `Monthly_fee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Monthly_fee_enrollment_id_expiration_date_key" ON "Monthly_fee"("enrollment_id", "expiration_date");
