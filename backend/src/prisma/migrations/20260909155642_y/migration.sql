/*
  Warnings:

  - You are about to drop the column `contatc_number` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `contatc_number` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contact_number]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contact_number]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact_number` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_number` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_contatc_number_key";

-- DropIndex
DROP INDEX "Teacher_contatc_number_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "contatc_number",
ADD COLUMN     "contact_number" VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "contatc_number",
ADD COLUMN     "contact_number" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_contact_number_key" ON "Student"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_contact_number_key" ON "Teacher"("contact_number");
