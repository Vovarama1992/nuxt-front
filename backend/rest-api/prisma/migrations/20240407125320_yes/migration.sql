/*
  Warnings:

  - Added the required column `height` to the `Product_sizes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Product_sizes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Product_sizes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product_sizes" ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "length" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;
