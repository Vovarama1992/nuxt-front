/*
  Warnings:

  - A unique constraint covering the columns `[telegram_id]` on the table `Profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `Profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profiles_telegram_id_key" ON "Profiles"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_phone_number_key" ON "Profiles"("phone_number");
