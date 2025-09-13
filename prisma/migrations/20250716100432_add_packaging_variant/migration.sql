/*
  Warnings:

  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Purchased_Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Purchased_Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Purchased_Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Purchased_Product` table. All the data in the column will be lost.
  - Added the required column `product_name` to the `Purchased_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_type` to the `Purchased_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant_price` to the `Purchased_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant_size` to the `Purchased_Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant_weight` to the `Purchased_Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PackagingVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER,
    "discount_price" INTEGER,
    "stock" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "PackagingVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "highlight" TEXT,
    "type" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_highlight" BOOLEAN
);
INSERT INTO "new_Product" ("description", "highlight", "id", "is_active", "is_highlight", "name", "photo", "type") SELECT "description", "highlight", "id", "is_active", "is_highlight", "name", "photo", "type" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Purchased_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_name" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,
    "variant_size" TEXT NOT NULL,
    "variant_price" INTEGER NOT NULL,
    "variant_weight" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "Purchased_Product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchased_Product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchased_Product" ("id", "order_id", "product_id", "quantity") SELECT "id", "order_id", "product_id", "quantity" FROM "Purchased_Product";
DROP TABLE "Purchased_Product";
ALTER TABLE "new_Purchased_Product" RENAME TO "Purchased_Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
