/*
  Warnings:

  - Added the required column `stock` to the `VariantValues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VariantValues" ADD COLUMN     "stock" INTEGER NOT NULL;
