/*
  Warnings:

  - You are about to drop the `Modality` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[class_id,student_id]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `monthly_price` to the `ClassGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassGroup" ADD COLUMN     "monthly_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Enrollment" ALTER COLUMN "start_date" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Modality";

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_class_id_student_id_key" ON "Enrollment"("class_id", "student_id");
