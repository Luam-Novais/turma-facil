-- AlterTable
ALTER TABLE "ClassGroup" ADD COLUMN     "daysOfWeek" INTEGER[];

-- AlterTable
ALTER TABLE "Monthly_fee" ALTER COLUMN "status" SET DEFAULT 'PENDING';
