import {
    component$,
    // useSignal
} from "@builder.io/qwik";

import { 
    Link,
    routeAction$,
    routeLoader$,
    useLocation,
    useNavigate
} from '@builder.io/qwik-city';

import { Breadcrumb } from "~/components/cms/breadcrumb";
import { Button } from "~/components/main/button";
import { Separator } from "~/components/cms/separator";
import { Table } from "~/components/cms/table";
import { Toggle } from "~/components/cms/toggle";
import { Popover } from "~/components/cms/popover";

import { SearchBarFilterBlock as SearchBarFilter } from "~/components/blocks/cms/search-bar-filter-block";
import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";
// import { Pagination } from "~/components/blocks/cms/pagination-block";

import { useToolProductsCMS } from "~/hooks/useToolProducts";
import { toolsFilterOption as filterOption } from "~/lib/filter-option";

import MenuDotsIcon from "~/assets/Icons/Menu Dots.svg";
import PenIcon from "~/assets/Icons/Pen.svg";
import TrashIcon from "~/assets/Icons/Trash Bin Trash.svg";
import Coffee_Tools from "~/assets/cms/icons/Coffee Tools.avif";

import { formatRupiah, isLocalhost } from "~/lib/utils";
// import { roastedCoffeeBeans } from "~/assets/data/products";
import { deleteProduct, getProducts, updateProductHighlight, updateProductStatus } from "~/server/services/products";
// import { SearchBar } from "~/components/cms/search-bar";

export const useFilter = routeLoader$(async () => {
    return filterOption;        
});

export const useProducts = routeLoader$(
    async (event) => {
        return await getProducts({ event });
    }
);

export const useDeleteProduct = routeAction$(
    async (values, event) => {
        return await deleteProduct({ values, event })
    }
);

export const useUpdateStatus = routeAction$(
    async (values, event) => {
        await updateProductStatus({ values, event });
        throw event.redirect(302, "/cms/products/tools");
    }
);

export const useUpdateHighlight = routeAction$(
    async (values, event) => {
        await updateProductHighlight({ values, event });
        throw event.redirect(302, "/cms/products/tools");
    }
);

export default component$(() => {
    const loc = useLocation();
    const navigate = useNavigate();

    const { submit: deleteProduct } = useDeleteProduct();
    const { submit: updateStatus } = useUpdateStatus();
    const { submit: updateHighlight } = useUpdateHighlight();

    const { type, material, compatibility } = useFilter().value;
    
    const { value: products } = useProducts();

    // const perPage = useSignal(10);

    const {
        typeFilter,
        materialFilter,
        compatibilityFilter,
        searchKeyword
    } = useToolProductsCMS();
    
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
                        <Breadcrumb.Item href="/cms/products/coffee-tools">
                            Products
                        </Breadcrumb.Item>

                        <Breadcrumb.Item visited>
                            Tools
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>

                    <Header.Root>
                        <Header.Content>
                            <Header.Illustration 
                                src={Coffee_Tools}
                                alt="Coffee Tools"
                            />

                            <Header.Detail>
                                <Header.Headline>
                                    Kelola Alat Seduh & Aksesoris
                                </Header.Headline>

                                <Header.SupportingHeadline>
                                    Update katalog alat seduh, kelola stok, atau tambahkan bundle produk.
                                </Header.SupportingHeadline>
                            </Header.Detail>
                        </Header.Content>

                        <Header.Actions>
                            <Button
                                variant="primary"
                                size="large"
                                onClick$={() => navigate("/cms/products/coffee-tools/create")}
                            >
                                Tambah Produk Baru
                            </Button>
                        </Header.Actions>
                    </Header.Root>

                    <Separator />
                    
                    <SearchBarFilter.Root>
                        <SearchBarFilter.SearchBar
                            placeholder="Cari Produk..."
                            valueChange$={(value) => searchKeyword.value = value}
                        />

                        <div class="flex flex-wrap gap-8">
                            <SearchBarFilter.Filter
                                label="Jenis Alat"
                                currentValue={typeFilter.value}
                                values={type}
                                onClick$={(value) => typeFilter.value = value}
                            />

                            <SearchBarFilter.Filter
                                label="Material"
                                currentValue={materialFilter.value}
                                values={material}
                                onClick$={(value) => materialFilter.value = value}
                            />

                            <SearchBarFilter.Filter
                                label="Kompatibilitas"
                                currentValue={compatibilityFilter.value}
                                values={compatibility}
                                onClick$={(value) => compatibilityFilter.value = value}
                            />
                        </div>
                    </SearchBarFilter.Root>

                    {/* <Table.Root class="h-[500px] w-full rounded-[12px] bg-neutral-custom-base border-[1.5px] border-neutral-custom-50 border-separate border-spacing-0 overflow-hidden"> */}
                    <div class="min-h-[500px] overflow-y-auto no-scrollbar rounded-[12px] border border-neutral-custom-50">
                    <Table.Root class="w-full border-separate border-spacing-0">
                        <Table.Head>
                            <Table.Row>
                                <Table.Cell type="header" class="min-w-[250px]">Nama produk</Table.Cell>
                                <Table.Cell type="header" class="min-w-[100px]">Status</Table.Cell>
                                <Table.Cell type="header" class="min-w-[100px]">Highlight</Table.Cell>
                                <Table.Cell type="header" class="min-w-[150px]">Stok</Table.Cell>
                                <Table.Cell type="header" class="min-w-[200px]">Foto</Table.Cell>
                                <Table.Cell type="header" class="min-w-[200px]">Harga</Table.Cell>
                                <Table.Cell type="header" class="min-w-fill">Aksi</Table.Cell>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body class="h-full w-full *:first:*:h-[150px] *:*:h-[150px] *:first:*:pt-5 *:last:*:pb-5">
                            {products.data.map((product) => {
                                return (
                                    <Table.Row key={product.id}>
                                        <Table.Cell class="min-w-[250px]">{product.name}</Table.Cell>

                                        <Table.Cell class="min-w-[100px]">
                                            <Toggle
                                                value={product.is_active}
                                                onClick$={() => updateStatus(product)}
                                            />
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[150px]">
                                            <Toggle
                                                value={product.is_highlight}
                                                onClick$={() => updateHighlight(product)}
                                            />
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[150px]">{ product.stock }</Table.Cell>

                                        <Table.Cell class="min-w-[200px]">
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
                                        </Table.Cell>

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
                                                    <Link 
                                                        href={`/cms/products/coffee-tools/${product.id}/edit`}
                                                    >
                                                        <img src={PenIcon} alt="Pen Icon" height={16} width={16} />
                                                        <p>Edit produk</p>
                                                    </Link>

                                                    <div
                                                        onClick$={() => deleteProduct({ id: product.id })}
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