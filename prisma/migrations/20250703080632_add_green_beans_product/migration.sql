-- CreateTable
CREATE TABLE "Green_Beans_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "elevation" INTEGER NOT NULL,
    "variety" TEXT,
    "origin" TEXT NOT NULL,
    "process" TEXT,
    "moisure_content" INTEGER,
    "density" INTEGER,
    "defect" TEXT,
    "screen_size" INTEGER,
    "roast_level" TEXT,
    "flavor_description" TEXT,
    "water_activity" INTEGER,
    "quakers" INTEGER,
    "cupping_potential" INTEGER,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "Green_Beans_Product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Green_Beans_Product_product_id_key" ON "Green_Beans_Product"("product_id");
