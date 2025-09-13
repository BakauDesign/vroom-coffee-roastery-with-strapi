import { getDB } from "~/lib/db";
import type { RequestEventLoader } from "@builder.io/qwik-city";

interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>
}

interface SalesData {
    month: string;
    sales: number; // Total quantity terjual
    revenue: number; // Total pendapatan
}

interface AnnualSalesChartData {
    salesData: SalesData[];
    availableYears: string[];
    suggestedMaxSales: number; // Max sales untuk menentukan suggestedMax di chart
}

export async function getProductWithAverageLowRating({
    event,
}: LoaderParams) {
    const { platform } = event;
    const db = await getDB(platform.env);

    try {
        // Langkah 1: Hitung rata-rata rating untuk setiap produk dan filter
        const productsWithAvgRating = await db.review.groupBy({
            by: ['product_id'],
            _avg: {
                rating: true,
            },
            having: {
                rating: {
                    _avg: {
                        lt: 4
                    }
                }
            },
            orderBy: {
                _avg: {
                    rating: 'asc'
                }
            },
            take: 1
        });

        if (productsWithAvgRating.length === 0) {
            return null;
        }

        const productId = productsWithAvgRating[0].product_id;

        const productDetail = await db.product.findUnique({
            where: {
                id: productId
            },
            select: {
                name: true
            }
        });

        // Gabungkan hasil dan kembalikan
        if (productDetail) {
            return productDetail.name;
        } else {
            return null; // Seharusnya tidak terjadi jika product_id valid
        }

    } catch (error: any) {
        console.error("Error fetching product with average low rating:", error);
        return null;
    } finally {
        await db.$disconnect();
    }
}

export async function getAnnualSalesData(event: RequestEventLoader<QwikCityPlatform>, selectedYear: number): Promise<AnnualSalesChartData> {
    const { platform } = event;
    const db = await getDB(platform.env);

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
        'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];

    try {
        const startOfYear = new Date(selectedYear, 0, 1);
        const endOfYear = new Date(selectedYear, 11, 31, 23, 59, 59, 999);

        const ordersInSelectedYear = await db.order.findMany({
            where: {
                date: {
                    gte: startOfYear,
                    lte: endOfYear
                },
                status: "Selesai"
            },
            select: {
                date: true,
                total_cost: true,
                purchasedProduct: {
                    select: {
                        quantity: true,
                    }
                }
            }
        });

        const monthlyData: { [key: string]: { sales: number; revenue: number } } = {};
        monthNames.forEach(month => {
            monthlyData[month] = { sales: 0, revenue: 0 };
        });

        let maxSalesForYear = 0;

        ordersInSelectedYear.forEach(order => {
            const monthIndex = order.date.getMonth();
            const monthName = monthNames[monthIndex];

            monthlyData[monthName].revenue += order.total_cost || 0;

            let currentOrderSales = 0;
            order.purchasedProduct.forEach(item => {
                currentOrderSales += item.quantity;
            });

            monthlyData[monthName].sales += currentOrderSales;

            if (monthlyData[monthName].sales > maxSalesForYear) {
                maxSalesForYear = monthlyData[monthName].sales;
            }
        });

        const salesData: SalesData[] = monthNames.map(month => ({
            month: month,
            sales: monthlyData[month].sales,
            revenue: monthlyData[month].revenue,
        }));

        const uniqueYears = await db.order.findMany({
            select: {
                date: true,
            },
            distinct: ['date'],
            orderBy: {
                date: 'asc',
            },
        });

        const availableYearsSet = new Set<string>();
        uniqueYears.forEach(order => {
            availableYearsSet.add(order.date.getFullYear().toString());
        });

        const availableYears = Array.from(availableYearsSet).sort();

        const suggestedMaxSales = Math.ceil(maxSalesForYear) + (maxSalesForYear > 0 ? 1 : 0);

        return {
            salesData,
            availableYears,
            suggestedMaxSales: suggestedMaxSales || 7
        };

    } catch (error: any) {
        console.error(`Error fetching annual sales data for chart:`, error);
        return {
            salesData: monthNames.map(month => ({ month: month, sales: 0, revenue: 0 })),
            availableYears: [new Date().getFullYear().toString()],
            suggestedMaxSales: 7
        };
    } finally {
        await db.$disconnect();
    }
}

export async function getTopSellingProduct({
    event,
}: LoaderParams) {
    const { platform } = event;

    const db = await getDB(platform.env);

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    try {
        const topProductAggregated = await db.purchased_Product.groupBy({
            by: ['product_id'],
            _sum: {
                quantity: true
            },
            where: {
                order_data: {
                    date: {
                        gte: startOfMonth,
                        lte: endOfMonth
                    }
                }
            },
            orderBy: {
                _sum: {
                    quantity: 'desc'
                }
            },
            take: 1
        });

        if (topProductAggregated.length === 0) {
            return null;
        }

        const productId = topProductAggregated[0].product_id;

        const productDetail = await db.product.findUnique({
            where: {
                id: productId
            },
            select: {
                name: true
            }
        });

        if (productDetail) {
            return productDetail.name;
        } else {
            return null;
        }

    } catch (error) {
        console.error("Error fetching single top selling product for current month:", error);
        throw error;
    }
}

export async function getSingleLowStockProduct({
    event,
}: LoaderParams) {
    const { platform } = event;

    const db = await getDB(platform.env);

    try {
        const lowStockProduct = await db.packagingVariant.findFirst({
            where: {
                stock: {
                    lt: 10
                },
                product: {
                    is_active: true
                }
            },
            orderBy: {
                stock: 'asc'
            },
            select: {
                product: {
                    select: {
                        name: true,
                        packagingVariants: {
                            select: { stock: true }
                        }
                    }
                }
            }
        });

        return lowStockProduct;
    } catch (error) {
        console.error("Error fetching single low stock product:", error);
        throw error;
    }
}