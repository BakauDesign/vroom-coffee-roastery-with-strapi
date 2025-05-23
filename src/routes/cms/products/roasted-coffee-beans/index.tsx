import { component$, $, useSignal } from "@builder.io/qwik";
// import { Dropdown } from "~/components/cms/dropdown";
import { Sidebar } from "~/components/cms/sidebar";
// import { DropdownStatus } from "~/components/cms/dropdown-status";


import { routeLoader$ } from '@builder.io/qwik-city';

import { Breadcrumb } from "~/components/cms/breadcrumb";
import { Button } from "~/components/main/button";
import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";
import { Separator } from "~/components/cms/separator";
import { SearchBarFilterBlock as SearchBarFilter } from "~/components/blocks/cms/search-bar-filter-block";
import { Table } from "~/components/cms/table";
import { Toggle } from "~/components/cms/toggle";

export const useUserProfile = routeLoader$(async () => {
    return {
        avatar: "https://i.pinimg.com/736x/36/70/ca/3670ca173dce942570e4c340d9323a3a.jpg",
        name: "Aulia Azahra",
        role: "Admin"
    };
});

export const useFilter = routeLoader$(async () => {
    return {
        brewingMethod: [
            {
                id: 1,
                label: "Pour Over"
            },
            {
                id: 2,
                label: "French Press"
            },
            {
                id: 3,
                label: "Aeropress"
            },
            {
                id: 4,
                label: "Espresso"
            },
            {
                id: 5,
                label: "Moka Pot"
            },
            {
                id: 6,
                label: "Cold Brew"
            },
            {
                id: 7,
                label: "Siphon"
            },
            {
                id: 8,
                label: "Semua Metode"
            }
        ]
    }
        
});

export default component$(() => {
    const user = useUserProfile();
    const filter = useFilter();
    const brewingMethods = filter.value.brewingMethod;

    const brewingMethod = useSignal("Pour Over");
    const searchKeyword = useSignal("");

    return (
        <>
            <section class="shrink-0 h-full min-h-full w-full flex flex-col gap-6 lg:flex-row relative">

                <Sidebar props={{
                    user: {
                        avatar: user.value.avatar,
                        name: user.value.name,
                        role: user.value.role,
                        onClickLogout$: $(() => console.info("LOGOUT"))
                    }
                }} />

                <section class="h-full w-full overflow-y-scroll overflow-x-hidden no-scrollbar bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 flex flex-col gap-9">
                    <Breadcrumb.Root>
                        <Breadcrumb.Item href="/cms/products/roasted-coffee-beans">
                            Products
                        </Breadcrumb.Item>

                        <Breadcrumb.Item visited>
                            Roasted Coffee Beans
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>

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
                            >
                                Tambah Produk Baru
                            </Button>
                        </Header.Actions>
                    </Header.Root>

                    <Separator />

                    <SearchBarFilter.Root>
                        <SearchBarFilter.SearchBar
                            placeholder="Cari Produk..."
                            onValueChange$={(value) => searchKeyword.value = value}
                        />

                        <SearchBarFilter.Filter
                            label="Metode Brewing"
                            currentValue={brewingMethod.value}
                            values={brewingMethods}
                            onClick$={(value) => brewingMethod.value = value}
                        />
                    </SearchBarFilter.Root>

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
                            <Table.Row>
                                <Table.Cell class="min-w-[250px]">Aceh Gayo Medium Roast</Table.Cell>

                                <Table.Cell class="min-w-[100px]">
                                    <Toggle value={true} />
                                </Table.Cell>

                                <Table.Cell class="min-w-[150px]">25</Table.Cell>

                                <Table.Cell class="min-w-[200px]">
                                    <img 
                                        src="https://i.pinimg.com/736x/4f/16/92/4f16925087a29cd5c3878f3f8761b36b.jpg"
                                        alt="Product Photo"
                                        class="w-full h-full object-cover rounded-[4px]"
                                        height={200}
                                        width={200}
                                    />
                                </Table.Cell>

                                <Table.Cell class="min-w-[200px]">Rp95.000</Table.Cell>

                                <Table.Cell class="w-fill min-w-[200px]">Aksi</Table.Cell>
                            </Table.Row>                        

                            <Table.Row>
                                <Table.Cell class="w-[250px]">Aceh Gayo Medium Roast</Table.Cell>

                                <Table.Cell class="w-[100px]">
                                    <Toggle />
                                </Table.Cell>

                                <Table.Cell class="w-[150px]">25</Table.Cell>

                                <Table.Cell class="w-[200px]">
                                    <img 
                                        src="https://i.pinimg.com/736x/4f/16/92/4f16925087a29cd5c3878f3f8761b36b.jpg"
                                        alt="Product Photo"
                                        class="w-full h-full object-cover rounded-[4px]"
                                        height={200}
                                        width={200}
                                    />
                                </Table.Cell>

                                <Table.Cell class="w-[200px]">Rp95.000</Table.Cell>

                                <Table.Cell class="w-fill min-w-[200px]">Aksi</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell class="w-[250px]">Aceh Gayo Medium Roast</Table.Cell>

                                <Table.Cell class="w-[100px]">
                                    <Toggle />
                                </Table.Cell>

                                <Table.Cell class="w-[150px]">25</Table.Cell>

                                <Table.Cell class="w-[200px]">
                                    <img 
                                        src="https://i.pinimg.com/736x/4f/16/92/4f16925087a29cd5c3878f3f8761b36b.jpg"
                                        alt="Product Photo"
                                        class="w-full h-full object-cover rounded-[4px]"
                                        height={200}
                                        width={200}
                                    />
                                </Table.Cell>

                                <Table.Cell class="w-[200px]">Rp95.000</Table.Cell>

                                <Table.Cell class="w-fill min-w-[200px]">Aksi</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell class="w-[250px]">Aceh Gayo Medium Roast</Table.Cell>

                                <Table.Cell class="w-[100px]">
                                    <Toggle />
                                </Table.Cell>

                                <Table.Cell class="w-[150px]">25</Table.Cell>

                                <Table.Cell class="w-[200px]">
                                    <img 
                                        src="https://i.pinimg.com/736x/4f/16/92/4f16925087a29cd5c3878f3f8761b36b.jpg"
                                        alt="Product Photo"
                                        class="w-full h-full object-cover rounded-[4px]"
                                        height={200}
                                        width={200}
                                    />
                                </Table.Cell>

                                <Table.Cell class="w-[200px]">Rp95.000</Table.Cell>

                                <Table.Cell class="w-fill min-w-[200px]">Aksi</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell class="w-[250px]">Aceh Gayo Medium Roast</Table.Cell>

                                <Table.Cell class="w-[100px]">
                                    <Toggle />
                                </Table.Cell>

                                <Table.Cell class="w-[150px]">25</Table.Cell>

                                <Table.Cell class="w-[200px]">
                                    <img 
                                        src="https://i.pinimg.com/736x/4f/16/92/4f16925087a29cd5c3878f3f8761b36b.jpg"
                                        alt="Product Photo"
                                        class="w-full h-full object-cover rounded-[4px]"
                                        height={200}
                                        width={200}
                                    />
                                </Table.Cell>

                                <Table.Cell class="w-[200px]">Rp95.000</Table.Cell>

                                <Table.Cell class="w-fill min-w-[200px]">Aksi</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell class="w-[250px]">Aceh Gayo Medium Roast</Table.Cell>

                                <Table.Cell class="w-[100px]">
                                    <Toggle />
                                </Table.Cell>

                                <Table.Cell class="w-[150px]">25</Table.Cell>

                                <Table.Cell class="w-[200px]">
                                    <img 
                                        src="https://i.pinimg.com/736x/4f/16/92/4f16925087a29cd5c3878f3f8761b36b.jpg"
                                        alt="Product Photo"
                                        class="w-full h-full object-cover rounded-[4px]"
                                        height={200}
                                        width={200}
                                    />
                                </Table.Cell>

                                <Table.Cell class="w-[200px]">Rp95.000</Table.Cell>

                                <Table.Cell class="w-fill min-w-[200px]">Aksi</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                    </div>
                    
                </section>
            </section>
        </>
    );
});