-- CreateTable
CREATE TABLE "Shipping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);
