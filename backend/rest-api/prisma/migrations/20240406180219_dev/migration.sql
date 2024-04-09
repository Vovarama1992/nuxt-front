/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Brands` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Product_statuses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Brands_title_key" ON "Brands"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Product_statuses_title_key" ON "Product_statuses"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Types_title_key" ON "Types"("title");
