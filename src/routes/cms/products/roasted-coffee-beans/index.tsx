import { 
    component$,
    // useSignal
} from "@builder.io/qwik";

import { 
    Link,
    // routeLoader$,
    // useNavigate
} from '@builder.io/qwik-city';

import { Breadcrumb } from "~/components/cms/breadcrumb";
// import { Button } from "~/components/main/button";
import { Separator } from "~/components/cms/separator";
import { Table } from "~/components/cms/table";
import { Toggle } from "~/components/cms/toggle";
import { Popover } from "~/components/cms/popover";

// import { SearchBarFilterBlock as SearchBarFilter } from "~/components/blocks/cms/search-bar-filter-block";
// import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";
// import { Pagination } from "~/components/blocks/cms/pagination-block";

// import { useRoastedProducts } from "~/hooks/useRoastedProducts";
// import { roastedFilterOption as filterOption } from "~/lib/filter-option";

import MenuDotsIcon from "~/assets/Icons/Menu Dots.svg";
import PenIcon from "~/assets/Icons/Pen.svg";
import TrashIcon from "~/assets/Icons/Trash Bin Trash.svg";
// import { formatRupiah } from "~/lib/utils";
// import { roastedCoffeeBeans } from "~/assets/data/products";

// export const useFilter = routeLoader$(async () => {
//     return filterOption;        
// });

// export const useProducts = routeLoader$(async () => {
//     return roastedCoffeeBeans;
// });

export default component$(() => {
    // const navigate = useNavigate();
    // const { brewingMethod: brewingMethodFilter } = useFilter().value;
    
    // const products = useProducts();

    // const perPage = useSignal(10);

    // const {
    //     brewingMethod,
    //     searchKeyword,
    //     currentPage,
    //     totalPages
    // } = useRoastedProducts({
    //     totalItems: products.value.length,
    //     initialPerPage: perPage.value,
    //     products: products.value
    // });

    return (
        <>
            <section class="shrink-0 h-full min-h-full w-full flex flex-col gap-6 lg:flex-row relative">
                <section class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9">
                <section class="no-scrollbar">
                    <Breadcrumb.Root>
                        <Breadcrumb.Item href="/cms/products/roasted-coffee-beans">
                            Products
                        </Breadcrumb.Item>

                        <Breadcrumb.Item visited>
                            Roasted Coffee Beans
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>
{/* 
                    <Header.Root>
                        <Header.Content>
                            <Header.Illustration 
                                src="https://i.pinimg.com/736x/21/e5/99/21e59960810bf8a066c81b496b3c814d.jpg"
                            />

                            <Header.Detail>
                                <Header.Headline>
                                    Kelola Biji Kopi Matang
                                </Header.Headline>

                                <Header.SupportingHeadline>
                                    Pantau stok, update roast level, atau tambahkan batch baru hasil sangrai terbaru.
                                </Header.SupportingHeadline>
                            </Header.Detail>
                        </Header.Content>

                        <Header.Actions>
                            <Button
                                variant="primary"
                                size="large"
                                onClick$={() => navigate("/cms/products/roasted-coffee-beans/create")}
                            >
                                Tambah Produk Baru
                            </Button>
                        </Header.Actions>
                    </Header.Root> */}

                    <Separator />
{/* 
                    <SearchBarFilter.Root>
                        <SearchBarFilter.SearchBar
                            placeholder="Cari Produk..."
                            onValueChange$={(value) => searchKeyword.value = value}
                        />

                        <SearchBarFilter.Filter
                            label="Metode Brewing"
                            currentValue={brewingMethod.value}
                            values={brewingMethodFilter}
                            onClick$={(value) => brewingMethod.value = value}
                        />
                    </SearchBarFilter.Root> */}

                    {/* <Table.Root class="h-[500px] w-full rounded-[12px] bg-neutral-custom-base border-[1.5px] border-neutral-custom-50 border-separate border-spacing-0 overflow-hidden"> */}
                    <div class="min-h-[500px] overflow-y-auto no-scrollbar rounded-[12px] border border-neutral-custom-50">
                    <Table.Root class="w-full border-separate border-spacing-0">
                        <Table.Head>
                            <Table.Row>
                                <Table.Cell type="header" class="min-w-[250px]">Nama produk</Table.Cell>
                                <Table.Cell type="header" class="min-w-[100px]">Status</Table.Cell>
                                <Table.Cell type="header" class="min-w-[150px]">Stok</Table.Cell>
                                <Table.Cell type="header" class="min-w-[200px]">Foto</Table.Cell>
                                <Table.Cell type="header" class="min-w-[200px]">Harga</Table.Cell>
                                <Table.Cell type="header" class="min-w-fill">Aksi</Table.Cell>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body class="h-full w-full *:first:*:h-[166px] *:*:h-[150px] *:first:*:pt-5 *:last:*:pb-5">
                            {['a', 'b', 'c', 'd', 'e'].map((value, index) => {
                                return (
                                    <Table.Row key={value+index}>
                                        <Table.Cell class="min-w-[250px]">Aceh Gayo Medium Roast</Table.Cell>

                                        <Table.Cell class="min-w-[100px]">
                                            <Toggle value={true} />
                                        </Table.Cell>

                                        <Table.Cell class="min-w-[150px]">25</Table.Cell>

                                        <Table.Cell class="min-w-[200px]">
                                            <img 
                                                src="https://i.pinimg.com/736x/b4/04/db/b404db0a532b8aee532d078c330901c2.jpg"
                                                alt="Product Photo"
                                                class="w-full h-full object-cover rounded-[4px]"
                                                height={200}
                                                width={200}
                                            />
                                        </Table.Cell>

                                        {/* <Table.Cell class="min-w-[200px]">{formatRupiah(95000)}</Table.Cell> */}

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
                                                    <Link href={`/cms/products/roasted-coffee-beans/${index}/edit`}>
                                                        <img src={PenIcon} alt="Pen Icon" height={16} width={16} />
                                                        <p>Edit produk</p>
                                                    </Link>

                                                    <div>
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
            </section>
        </>
    );
});