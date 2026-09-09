/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToEnrollment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class_id` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToEnrollment" DROP CONSTRAINT "_ClassToEnrollment_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToEnrollment" DROP CONSTRAINT "_ClassToEnrollment_B_fkey";

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "class_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "_ClassToEnrollment";

-- CreateTable
CREATE TABLE "ClassGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "teacher_id" INTEGER NOT NULL,

    CONSTRAINT "ClassGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassGroup" ADD CONSTRAINT "ClassGroup_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ClassGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
