-- CreateTable
CREATE TABLE "Roasted_Beans_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origin" TEXT NOT NULL,
    "process" TEXT NOT NULL,
    "test_notes" TEXT NOT NULL,
    "packaging" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "Roasted_Beans_Product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Serving_Recomendation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "roasted_beans_product_id" INTEGER NOT NULL,
    CONSTRAINT "Serving_Recomendation_roasted_beans_product_id_fkey" FOREIGN KEY ("roasted_beans_product_id") REFERENCES "Roasted_Beans_Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Roasted_Beans_Product_product_id_key" ON "Roasted_Beans_Product"("product_id");
