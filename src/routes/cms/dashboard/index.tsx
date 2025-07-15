import { component$ } from "@builder.io/qwik";

import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";

import Coffee from "~/assets/cms/icons/Coffee.avif";
import Leaf from "~/assets/cms/icons/Leaf.avif";
import Star from "~/assets/cms/icons/Star.avif";
import Box from "~/assets/cms/icons/Box.avif";
import Cart from "~/assets/cms/icons/Cart.avif";
import Green_Coffee_Beans from "~/assets/cms/icons/Green Coffee Beans.avif";
import Sunflower from "~/assets/cms/icons/Sunflower.avif";
import Review from "~/assets/cms/icons/Review.avif";

import { Link, RequestEventLoader, routeLoader$ } from "@builder.io/qwik-city";
import {
    getTotalOrder,
    getOrderRevenue,
    getOrderTotalByStatus,
} from "~/server/orders";

import {
    getAnnualSalesData,
    getTopSellingProduct,
    getSingleLowStockProduct,
    getProductWithAverageLowRating
} from "~/server/services/dashboard";

import { formatRupiah } from "~/lib/utils";
import { AnnualSalesChart } from "~/components/cms/charts/annual-sales-chart";

// import { routeLoader$ } from "@builder.io/qwik-city";
// import { Dropdown } from "~/components/cms/dropdown";
// import { Sidebar } from "~/components/cms/sidebar";
// import { DropdownStatus } from "~/components/cms/dropdown-status";


// import { routeLoader$ } from '@builder.io/qwik-city';

// import InfoIcon from "~/assets/Icons/Info Circle.svg";
// import BankNoteIcon from "~/assets/Icons/Banknote 3.svg";
// import BoxIcon from "~/assets/Icons/Box.svg";
// import CloseCircleIcon from "~/assets/Icons/Close Circle.svg";
// import DeliveryIcon from "~/assets/Icons/Delivery.svg";
// import CheckCircleIcon from "~/assets/Icons/Check Circle.svg";
// import { Shipping } from "~/components/cms/shipping";
// import { Toggle } from "~/components/cms/toggle";
// import { UploadPhoto } from "~/components/cms/upload-photo";
// import { Product } from "~/components/cms/product";
// import { Review } from "~/components/cms/review";
// import { Review } from "~/components/main/review";

// export const useUserProfile = routeLoader$(async () => {
//     return {
//         avatar: "https://i.pinimg.com/736x/36/70/ca/3670ca173dce942570e4c340d9323a3a.jpg",
//         name: "Aulia Azahra",
//         role: "Admin"
//     };
// });

// export const useBucketLoader = routeLoader$(async ({ platform }) => {
//     if (!platform?.env?.BUCKET) {
//         console.error("R2 Bucket binding BUCKET not found on platform.env");
//         return null;
//     }

//     // const object = await platform.env.BUCKET.get("vroom-coffee-roastery/25253917747321e3a120cea41140ecc7.jpg");
//     const object = await platform.env.BUCKET.get("25253917747321e3a120cea41140ecc7.jpg");

//     if (!object) {
//         console.warn("Object not found");
//     } else {
//         console.info("Object found:", object);
//     }
// });

interface SalesData {
    month: string;
    sales: number;
    revenue: number;
}

// Interface untuk data yang akan dikembalikan oleh loader
interface AnnualSalesChartLoaderData {
    salesData: SalesData[];
    availableYears: string[];
    suggestedMaxSales: number;
    selectedYear: string; // Tambahkan ini agar chart tau tahun yang sedang ditampilkan
}

export const useDashboardData = routeLoader$(
    async (event: RequestEventLoader): Promise<AnnualSalesChartLoaderData> => {
        const yearParam = event.url.searchParams.get('year');
        const selectedYear = yearParam ? parseInt(yearParam) : new Date().getFullYear();

        const chartData = await getAnnualSalesData(event, selectedYear);

        return {
            salesData: chartData.salesData,
            availableYears: chartData.availableYears,
            suggestedMaxSales: chartData.suggestedMaxSales,
            selectedYear: selectedYear.toString()
        };
    }
);

export const useStatistics = routeLoader$(
    async (event) => {
        try {
            const [
                totalOrder,
                orderRevenue,
                topSellingProduct,
                orderTotalByStatus,
                singleLowStockProduct,
                productWithAverageLowRating
            ] = await Promise.all([
                getTotalOrder({ event }),
                getOrderRevenue({ event }),
                getTopSellingProduct({ event }),
                getOrderTotalByStatus({ event: event, status: ['Dibatalkan', 'Dikirim', 'Selesai'] }),
                getSingleLowStockProduct({ event }),
                getProductWithAverageLowRating({ event })
            ]);

            return { totalOrder, orderRevenue, topSellingProduct, orderTotalByStatus, singleLowStockProduct, productWithAverageLowRating };
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data secara paralel:", error);
            throw error; // Lempar error agar bisa ditangani di pemanggil
        }
    }
);

export default component$(() => {
    const {
        totalOrder,
        orderRevenue,
        topSellingProduct,
        orderTotalByStatus,
        singleLowStockProduct,
        productWithAverageLowRating
    } = useStatistics().value;

    const dashboardData = useDashboardData();



    // const currentSelectedYear = dashboardData.value.selectedYear;

    // const wahabi = useSignal("Wahabi 1");
    // const orderStatus = useSignal("Menunggu Konfirmasi");
    // const user = useUserProfile();
    // const shipping = useSignal("JNE");

    // const activeShipping = useSignal({
    //     JNE: true,
    //     JNT: false,
    //     Si_Cepat: false,
    //     Go_Send: true,
    // });
    // const menu = useSignal(true);

    return (
        <>
            {/* <section class="shrink-0 h-fit min-h-full w-full flex flex-col gap-6 lg:flex-row relative"> */}

                {/* <Sidebar /> */}

                {/* <section class="h-full w-full bg-neutral-custom-base px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 pt-[124px]"> 
                    <div class="py-6 px-12 bg-blue-300">
                        <h1 class="text-4xl text-center">
                            YOU'RE IN DASHBOARD
                        </h1>
                    </div>
                </section> */}
            {/* </section> */}
            <section class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9">
                <section class="no-scrollbar">
                    <Header.Root>
                        <Header.Content>
                            <Header.Detail>
                                <Header.Headline>
                                    Pantau Bisnis Kopi Spesialti Anda dalam Satu Layar
                                </Header.Headline>

                                <Header.SupportingHeadline>
                                    Roast lebih cerdas dengan data real-time tentang penjualan, stok, dan kepuasan pelanggan.
                                </Header.SupportingHeadline>
                            </Header.Detail>
                        </Header.Content>
                    </Header.Root>

                    <section class="flex flex-col gap-y-8">
                        <article class="font-inter flex gap-4 items-center">
                            <h1 class="text-neutral-custom-800 font-medium text-cms-h3-medium">
                                Ringkasan&nbsp;Utama
                            </h1>

                            <span class="h-[1.5px] w-full bg-neutral-custom-100" />
                        </article>

                        <ul class={`
                            grid grid-cols-[minmax(204px,1fr)_minmax(204px,1fr)_minmax(480px,3fr)] gap-6
                            *:h-[140px] *:p-4 *:relative *:bg-neutral-custom-base *:rounded-[6px] *:shadow-[4px_4px_16px_0px_rgba(204,204,204,0.10)] *:border-[1.5px] *:border-solid *:border-neutral-custom-100
                            *:flex *:flex-col *:gap-y-6 *:*:flex *:*:flex-col *:*:gap-y-3 *:overflow-hidden
                        `}>
                            <li>
                                <h1 class="text-neutral-custom-800 text-cms-label-small sm:text-cms-label-medium">
                                    Total Pesanan
                                </h1>

                                <article class="font-inter relative z-10">
                                    <h1 class="text-neutral-custom-700 text-cms-h3-small sm:text-cms-h3-medium lg:text-cms-h3-large font-semibold">
                                        { totalOrder }
                                    </h1>

                                    <h2 class="text-neutral-custom-500 text-cms-label-small sm:text-cms-label-medium font-medium">
                                        bulan ini
                                    </h2>
                                </article>

                                <img
                                    src={Coffee}
                                    height={100}
                                    width={100}
                                    alt="Coffee Icon"
                                    class="absolute right-[-25px] bottom-[-25px] rotate-[-16deg]"
                                />
                            </li>

                            <li>
                                <h1 class="text-neutral-custom-800 text-cms-label-small sm:text-cms-label-medium">
                                    Pendapatan
                                </h1>

                                <article class="font-inter relative z-10">
                                    <h1 class="text-neutral-custom-700 text-cms-h3-small sm:text-cms-h3-medium lg:text-cms-h3-large font-semibold">
                                        {formatRupiah(orderRevenue)}
                                    </h1>

                                    <h2 class="text-neutral-custom-500 text-cms-label-small sm:text-cms-label-medium font-medium">
                                        bulan ini
                                    </h2>
                                </article>

                                <img
                                    src={Leaf}
                                    height={100}
                                    width={100}
                                    alt="Leaf Icon"
                                    class="absolute right-[-17px] bottom-[-29px] rotate-[16deg]"
                                />
                            </li>

                            <li>
                                <h1 class="text-neutral-custom-800 text-cms-label-small sm:text-cms-label-medium">
                                    Produk Terlaris
                                </h1>

                                <article class="font-inter relative z-10">
                                    <h1 class="text-neutral-custom-700 text-cms-h3-small sm:text-cms-h3-medium lg:text-cms-h3-large font-semibold">
                                        { topSellingProduct }
                                    </h1>

                                    <h2 class="text-neutral-custom-500 text-cms-label-small sm:text-cms-label-medium font-medium">
                                        bulan ini
                                    </h2>
                                </article>

                                <img
                                    src={Star}
                                    height={100}
                                    width={100}
                                    alt="Star Icon"
                                    class="absolute right-[-22px] bottom-[-23px] rotate-[-8deg]"
                                />
                            </li>
                        </ul>

                        <ul class={`
                            grid grid-cols-[minmax(204px,1fr)_minmax(480px,3fr)_minmax(204px,1fr)] gap-6
                            *:h-[140px] *:p-4 *:relative *:bg-neutral-custom-base *:rounded-[6px] *:shadow-[4px_4px_16px_0px_rgba(204,204,204,0.10)] *:border-[1.5px] *:border-solid *:border-neutral-custom-100
                            *:flex *:flex-col *:gap-y-6 *:*:flex *:*:flex-col *:*:gap-y-3 *:overflow-hidden
                        `}>
                            <li>
                                <h1 class="text-neutral-custom-800 text-cms-label-small sm:text-cms-label-medium">
                                    Pesanan Baru
                                </h1>

                                <article class="font-inter relative z-10">
                                    <h1 class="text-neutral-custom-700 text-cms-h3-small sm:text-cms-h3-medium lg:text-cms-h3-large font-semibold">
                                        { orderTotalByStatus }
                                    </h1>

                                    <h2 class="text-neutral-custom-500 text-cms-label-small sm:text-cms-label-medium font-medium">
                                        belum diproses
                                    </h2>
                                </article>

                                <img
                                    src={Box}
                                    height={100}
                                    width={100}
                                    alt="Box Icon"
                                    class="absolute right-[-25px] bottom-[-25px] rotate-[-16deg]"
                                />
                            </li>

                            <li>
                                <h1 class="text-neutral-custom-800 text-cms-label-small sm:text-cms-label-medium">
                                    Stok Rendah
                                </h1>

                                <article class="font-inter relative z-10">
                                    <h1 class="text-neutral-custom-700 text-cms-h3-small sm:text-cms-h3-medium lg:text-cms-h3-large font-semibold">
                                        {
                                            singleLowStockProduct ? (`
                                                ${singleLowStockProduct?.name} tersisa ${singleLowStockProduct?.stock}
                                            `) : (`Tidak Ada`)
                                        }
                                    </h1>

                                    <h2 class="text-neutral-custom-500 text-cms-label-small sm:text-cms-label-medium font-medium">
                                        {!singleLowStockProduct ? "Tidak" : null } perlu ditinjau
                                    </h2>
                                </article>

                                <img
                                    src={Cart}
                                    height={100}
                                    width={100}
                                    alt="Cart Icon"
                                    class="absolute right-[-22px] bottom-[-23px] rotate-[16deg]"
                                />
                            </li>

                            <li>
                                <h1 class="text-neutral-custom-800 text-cms-label-small sm:text-cms-label-medium">
                                    Review Pelanggan
                                </h1>

                                <article class="font-inter relative z-10">
                                    <h1 class="text-neutral-custom-700 text-cms-h3-small sm:text-cms-h3-medium lg:text-cms-h3-large font-semibold">
                                        { !productWithAverageLowRating ?  "Tidak Ada" : null }
                                    </h1>

                                    <h2 class="text-neutral-custom-500 text-cms-label-small sm:text-cms-label-medium font-medium">
                                        {!productWithAverageLowRating ? "Tidak" : null } perlu ditinjau
                                    </h2>
                                </article>

                                <img
                                    src={Review}
                                    height={100}
                                    width={100}
                                    alt="Review Icon"
                                    class="absolute right-[-17px] bottom-[-29px] rotate-[-8deg]"
                                />
                            </li>
                        </ul>
                    </section>

                    <section class="grid grid-cols-2 gap-9">
                        <AnnualSalesChart
                            salesData={dashboardData.value.salesData}
                            suggestedMaxSales={dashboardData.value.suggestedMaxSales}
                            selectedYear={dashboardData.value.selectedYear}
                            availableYears={dashboardData.value.availableYears}
                        />

                        <section class="h-fit p-6 rounded-[6px] bg-neutral-custom-base shadow-[4px_4px_16px_0px_rgba(204,204,204,0.10)] border-[1.5px] border-solid border-neutral-custom-100 flex flex-col gap-y-6">
                            <article class="font-inter flex gap-4 items-center">
                                <h1 class="text-neutral-custom-800 font-medium text-cms-h3-medium">
                                    Quick&nbsp;Links
                                </h1>

                                <span class="h-[1.5px] w-full bg-neutral-custom-100" />
                            </article>

                            <nav class="flex flex-col gap-y-6 *:py-1.5 *:px-4 *:flex *:gap-x-6 *:items-center *:*:font-inter *:*:text-cms-label-small *:*:sm:text-cms-label-medium *:*:text-neutral-custom-800">
                                <Link href="/cms/products/roasted-coffee-beans/create/">
                                    <img src={Green_Coffee_Beans} alt="Add New Product Icon" height={56} width={56} />
                                    <p>Tambah Produk Baru</p>
                                </Link>

                                <Link href="/cms/orders">
                                    <img src={Sunflower} alt="Sunflower Icon" height={56} width={56} />
                                    <p>Kelola Pesanan</p>
                                </Link>

                                <Link href="/cms/products/reviews">
                                    <img src={Review} alt="Review Icon" height={56} width={56} />
                                    <p>Kelola Review</p>
                                </Link>
                            </nav>

                        </section>
                    </section>
                </section>
            </section>
        </>
    );
});