import {
    component$,
    // useSignal
} from "@builder.io/qwik";

import { 
    // Link,
    routeAction$,
    routeLoader$,
    // useLocation,
    // useNavigate
} from '@builder.io/qwik-city';

import { Breadcrumb } from "~/components/cms/breadcrumb";
// import { Button } from "~/components/main/button";
import { Separator } from "~/components/cms/separator";
import { Table } from "~/components/cms/table";
import { Popover } from "~/components/cms/popover";

// import { SearchBarFilterBlock as SearchBarFilter } from "~/components/blocks/cms/search-bar-filter-block";
import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";
// import { Pagination } from "~/components/blocks/cms/pagination-block";

// import { useGreenProductsCMS } from "~/hooks/useGreenProducts";
import { greenFilterOption } from "~/lib/filter-option";

import MenuDotsIcon from "~/assets/Icons/Menu Dots.svg";
// import PenIcon from "~/assets/Icons/Pen.svg";
import TrashIcon from "~/assets/Icons/Trash Bin Trash.svg";
import Green_Coffee_Beans from "~/assets/cms/icons/Green Coffee Beans.avif";

// import { formatRupiah, isLocalhost } from "~/lib/utils";
// import { roastedCoffeeBeans } from "~/assets/data/products";
import { updateProductHighlight, updateProductStatus } from "~/server/services/products";
import { deleteOrder, getOrders } from "~/server/orders";
import { formatDateTime, formatRupiah } from "~/lib/utils";
import { DropdownStatus } from "~/components/cms/dropdown-status";

import { Info } from "~/assets/cms/icons/Info";
import { Payment } from "~/assets/cms/icons/Payment";
import { Package } from "~/assets/cms/icons/Package";
import { Canceled } from "~/assets/cms/icons/Canceled";
import { Sent } from "~/assets/cms/icons/Sent";
import { Done } from "~/assets/cms/icons/Done";
import { getWhatsAppTemplate } from "~/lib/whatsapp-services";
// import { SearchBar } from "~/components/cms/search-bar";

export const useFilter = routeLoader$(async () => {
    return greenFilterOption;    
});

export const useOrders = routeLoader$(
    async (event) => {
        return await getOrders({ event });
    }
);

export const useDeleteOrder = routeAction$(
    async (values, event) => {
        await deleteOrder({ values, event });
    }
);

export const useUpdateStatus = routeAction$(
    async (values, event) => {
        await updateProductStatus({ values, event });
        throw event.redirect(302, "/cms/products/green-coffee-beans");
    }
);

export const useUpdateHighlight = routeAction$(
    async (values, event) => {
        await updateProductHighlight({ values, event });
        throw event.redirect(302, "/cms/products/green-coffee-beans");
    }
);

export default component$(() => {
    // const loc = useLocation();
    // const navigate = useNavigate();

    const { submit: deleteOrder } = useDeleteOrder();
    // const { submit: updateStatus } = useUpdateStatus();
    // const { submit: updateHighlight } = useUpdateHighlight();
    
    // const { origin, process, grade } = useFilter().value;
    
    const { value: orders } = useOrders();

    // const perPage = useSignal(10);

    // const { originFilter, processFilter, gradeFilter, searchKeyword } = useGreenProductsCMS();
    
    // const {
    //     brewingMethod,
    //     searchKeyword,
    //     currentPage,
    //     totalPages
    // } = useRoastedProducts({
    //     totalItems: products.data.length,
    //     initialPerPage: perPage.value,
    //     products: products.data.length
    // });

    return (
        <>
            {/* <section class="shrink-0 h-full min-h-full w-full flex flex-col gap-6 lg:flex-row relative"> */}
                <section class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9">
                <section class="no-scrollbar">
                    <Breadcrumb.Root>
                        <Breadcrumb.Item href="/cms/orders">
                            Orders
                        </Breadcrumb.Item>

                        <Breadcrumb.Item visited>
                            Order list
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>

                    <Header.Root>
                        <Header.Content>
                            <Header.Illustration 
                                src={Green_Coffee_Beans}
                                alt="Green Coffee Beans"
                            />

                            <Header.Detail>
                                <Header.Headline>
                                    Daftar Pesanan
                                </Header.Headline>

                                <Header.SupportingHeadline>
                                    Kelola seluruh transaksi pelanggan dengan mudah. Pantau status, filter, dan lakukan aksi cepat.
                                </Header.SupportingHeadline>
                            </Header.Detail>
                        </Header.Content>

                        <Header.Actions>
                            {/* <Button
                                variant="primary"
                                size="large"
                                onClick$={() => navigate("/cms/orders/create")}
                            >
                                Tambah Produk Baru
                            </Button> */}
                        </Header.Actions>
                    </Header.Root>

                    <Separator />

                    {/* <SearchBarFilter.Root>
                        <SearchBarFilter.SearchBar
                            placeholder="Cari Produk..."
                            valueChange$={(value) => searchKeyword.value = value}
                        />

                        <div class="flex flex-wrap gap-8">
                            <SearchBarFilter.Filter
                                label="Asal Daerah"
                                currentValue={originFilter.value}
                                values={origin}
                                onClick$={(value) => originFilter.value = value}
                            />

                            <SearchBarFilter.Filter
                                label="Proses"
                                currentValue={processFilter.value}
                                values={process}
                                onClick$={(value) => processFilter.value = value}
                            />

                            <SearchBarFilter.Filter
                                label="Grade"
                                currentValue={gradeFilter.value}
                                values={grade}
                                onClick$={(value) => gradeFilter.value = value}
                            />
                        </div>
                    </SearchBarFilter.Root> */}

                    {/* <Table.Root class="h-[500px] w-full rounded-[12px] bg-neutral-custom-base border-[1.5px] border-neutral-custom-50 border-separate border-spacing-0 overflow-hidden"> */}
                    <div class="min-h-[500px] overflow-y-auto no-scrollbar rounded-[12px] border border-neutral-custom-50">
                    <Table.Root class="w-full border-separate border-spacing-0">
                        <Table.Head>
                            <Table.Row>
                                <Table.Cell type="header" class="min-w-[100px]">ID&nbsp;Pesanan</Table.Cell>
                                <Table.Cell type="header" class="min-w-[250px]">Tanggal</Table.Cell>
                                <Table.Cell type="header" class="min-w-[150px]">Customer</Table.Cell>
                                <Table.Cell type="header" class="min-w-[250px]">Produk</Table.Cell>
                                <Table.Cell type="header" class="min-w-[200px]">Total</Table.Cell>
                                <Table.Cell type="header" class="min-w-[200px]">Resi</Table.Cell>
                                <Table.Cell type="header" class="min-w-[320px]">Status</Table.Cell>
                                <Table.Cell type="header" class="min-w-fill">Aksi</Table.Cell>
                                {/* <Table.Cell type="header" class="min-w-[200px]">Harga</Table.Cell> */}
                            </Table.Row>
                        </Table.Head>

                        <Table.Body class="h-full w-full *:first:*:h-[150px] *:*:h-[150px] *:first:*:pt-5 *:last:*:pb-5">
                            {orders.data?.map((order) => {
                                return (
                                    <Table.Row key={order.id}>
                                        <Table.Cell class="min-w-[100px]">{order.id}</Table.Cell>

                                        <Table.Cell class="min-w-[250px]">
                                            { formatDateTime(order.date.toISOString()) }
                                        </Table.Cell>
                                        <Table.Cell class="min-w-[150px]">
                                            <div class="flex flex-col gap-2">
                                                <p>{ order.buyer_name }</p>

                                                <p  class="py-2 px-3 cursor-pointer bg-primary-base text-primary-400 border-[1.5px] border-primary-400 rounded-2xl font-medium"
                                                    onClick$={() => {
                                                        window.open(`https://wa.me/+62${order.whatsapp_number}?text=${getWhatsAppTemplate(order)}`)
                                                    }}
                                                >
                                                    Kirim Pesan
                                                </p>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[250px] *:flex *:flex-col *:gap-4 *:*:flex *:*:gap-2 *:*:items-center">
                                            <ul>
                                                { order.purchasedProduct.map((pr) => (
                                                    <li key={pr.id}>
                                                        <p>{pr.name}&nbsp;x&nbsp;{pr.quantity}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Table.Cell>
                                        <Table.Cell class="min-w-[200px]">
                                            { formatRupiah(order.total_cost || 0) }
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[200px]">
                                            { order.tracking_number || "-" }
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[320px]">
                                            <DropdownStatus.Root
                                                currentValue={order.status}
                                                // onClick$={()}
                                            >
                                                <DropdownStatus.Trigger />

                                                <DropdownStatus.Items>
                                                    <DropdownStatus.Item value="Menunggu Konfirmasi">
                                                        <Info />
                                                        <p>Menunggu Konfirmasi</p>
                                                    </DropdownStatus.Item>

                                                    <DropdownStatus.Item value="Menunggu Pembayaran">
                                                        <Payment />
                                                        <p>Menunggu Pembayaran</p>
                                                    </DropdownStatus.Item>

                                                    <DropdownStatus.Item value="Diproses">
                                                        <Package />
                                                        <p>Diproses</p>
                                                    </DropdownStatus.Item>

                                                    <DropdownStatus.Item value="Dibatalkan">
                                                        <Canceled />
                                                        <p>Dibatalkan</p>
                                                    </DropdownStatus.Item>

                                                    <DropdownStatus.Item value="Dikirim">
                                                        <Sent />
                                                        <p>Dikirim</p>
                                                    </DropdownStatus.Item>

                                                    <DropdownStatus.Item value="Selesai">
                                                        <Done />
                                                        <p>Selesai</p>
                                                    </DropdownStatus.Item>
                                                </DropdownStatus.Items>
                                            </DropdownStatus.Root>
                                        </Table.Cell>

                                        {/* <Table.Cell class="min-w-[150px]">{ order.stock }</Table.Cell> */}

                                        {/* <Table.Cell class="min-w-[200px]">
                                            <img 
                                                src={`${isLocalhost(loc.url) ? `http://127.0.0.1:8788/media/${product.photo}` : `https://vroom-coffee-roastery.pages.dev/media/${product.photo}`}`}
                                                alt="Product Photo"
                                                class="w-full h-full object-cover rounded-[4px]"
                                                height={200}
                                                width={200}
                                            />
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[200px] flex flex-col gap-y-2 justify-center">
                                            {product.discount_price ? (
                                                <>
                                                    <p class="line-through text-neutral-custom-400">{ formatRupiah(product.price) }</p>
                                                    <p>{ formatRupiah(product.discount_price) }</p>
                                                </>
                                            ) : (
                                                <p>{ formatRupiah(product.price) }</p>
                                            )}
                                        </Table.Cell> */}

                                        <Table.Cell class="w-fill min-w-[200px]">
                                            <Popover.Root>
                                                <Popover.Trigger>
                                                    <img
                                                        src={MenuDotsIcon}
                                                        alt="Menu Dots Icon"
                                                        height={24}
                                                        width={24}
                                                    />
                                                </Popover.Trigger>

                                                <Popover.Content class="flex flex-col gap-y-4 text-cms-label-small *:cursor-pointer *:flex *:gap-2 *:items-center">
                                                    {/* <Link 
                                                        href={`/cms/products/green-coffee-beans/${product.id}/edit`}
                                                    >
                                                        <img src={PenIcon} alt="Pen Icon" height={16} width={16} />
                                                        <p>Edit produk</p>
                                                    </Link> */}

                                                    <div
                                                        onClick$={() => deleteOrder({ id: order.id })}
                                                    >
                                                        <img src={TrashIcon} alt="Trash Icon" height={16} width={16} />
                                                        <p>Hapus produk</p>
                                                    </div>
                                                </Popover.Content>
                                            </Popover.Root>
                                        </Table.Cell>
                                    </Table.Row>     
                                )
                            })}                   
                        </Table.Body>
                    </Table.Root>
                    </div>
{/* 
                    <Pagination
                        currentPage={currentPage.value}
                        totalPages={totalPages}
                        perPage={10}
                        onPageChange$={(page) => currentPage.value = page}
                        onPerPageChange$={(val) => {
                            perPage.value = val;
                            currentPage.value = 1;
                        }}
                    /> */}
                </section>
                </section>
            {/* </section> */}
        </>
    );
});