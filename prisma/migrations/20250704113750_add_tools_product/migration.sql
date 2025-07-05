-- CreateTable
CREATE TABLE "Main_Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emoji" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tools_product_id" INTEGER NOT NULL,
    CONSTRAINT "Main_Feature_tools_product_id_fkey" FOREIGN KEY ("tools_product_id") REFERENCES "Tools_Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tools_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "material" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "dimensions" TEXT,
    "compatibility" TEXT,
    "settings" TEXT,
    "accessories" TEXT,
    "packaging" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "Tools_Product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tools_Product_product_id_key" ON "Tools_Product"("product_id");
