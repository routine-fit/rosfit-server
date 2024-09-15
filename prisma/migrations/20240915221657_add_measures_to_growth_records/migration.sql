-- AlterTable
ALTER TABLE "GrowthRecord" ADD COLUMN     "heightMeasure" TEXT NOT NULL DEFAULT 'm',
ADD COLUMN     "weightMeasure" TEXT NOT NULL DEFAULT 'kg';
