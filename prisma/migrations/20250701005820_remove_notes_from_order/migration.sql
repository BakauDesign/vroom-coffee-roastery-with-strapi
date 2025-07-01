/*
  Warnings:

  - You are about to drop the column `notes` on the `Order` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buyer_name" TEXT NOT NULL,
    "whatsapp_number" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "courier_notes" TEXT,
    "status" TEXT NOT NULL,
    "tracking_number" TEXT NOT NULL,
    "shipping_cost" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_method" TEXT NOT NULL,
    "shipping_id" INTEGER NOT NULL,
    CONSTRAINT "Order_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "Shipping" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("address", "buyer_name", "courier_notes", "date", "id", "payment_method", "shipping_cost", "shipping_id", "status", "tracking_number", "whatsapp_number") SELECT "address", "buyer_name", "courier_notes", "date", "id", "payment_method", "shipping_cost", "shipping_id", "status", "tracking_number", "whatsapp_number" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
