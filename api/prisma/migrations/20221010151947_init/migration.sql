/*
  Warnings:

  - Made the column `hidden` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "hidden" SET NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL;
