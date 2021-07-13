-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone_number" TEXT,
    "profile_picture_url" TEXT,
    "province_id" INTEGER,
    "city_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VaccineHistoryPhoto" (
    "id" SERIAL NOT NULL,
    "vaccine_history_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VaccineType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VaccineHistory" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "date_administered" TIMESTAMP(3) NOT NULL,
    "date_valid_until" TIMESTAMP(3) NOT NULL,
    "vaccine_type_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT,
    "is_cat_friendly" BOOLEAN,
    "is_child_friendly" BOOLEAN,
    "color" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "is_dog_friendly" BOOLEAN,
    "gender" "Gender",
    "is_microchipped" BOOLEAN,
    "is_neutered" BOOLEAN,
    "profile_picture_url" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pet.user_id_unique" ON "Pet"("user_id");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccineHistoryPhoto" ADD FOREIGN KEY ("vaccine_history_id") REFERENCES "VaccineHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccineHistory" ADD FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VaccineHistory" ADD FOREIGN KEY ("vaccine_type_id") REFERENCES "VaccineType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
