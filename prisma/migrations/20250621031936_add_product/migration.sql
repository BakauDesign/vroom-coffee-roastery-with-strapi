-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "highlight" TEXT,
    "stock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER,
    "discount_price" INTEGER,
    "weight" INTEGER NOT NULL,
    "type" TEXT NOT NULL
);
