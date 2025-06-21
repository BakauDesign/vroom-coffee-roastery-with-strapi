import * as v from 'valibot';

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
import { Popover } from "~/components/cms/popover";

import { SearchBarFilterBlock as SearchBarFilter } from "~/components/blocks/cms/search-bar-filter-block";
import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";
import { Pagination } from "~/components/blocks/cms/pagination-block";

import { useUsers } from "~/hooks/useUsers";

import MenuDotsIcon from "~/assets/Icons/Menu Dots.svg";
import PenIcon from "~/assets/Icons/Pen.svg";
import TrashIcon from "~/assets/Icons/Trash Bin Trash.svg";

import UserIllustration from "~/assets/cms/icons/Review.avif";
import { getDB } from "~/lib/db";
import { formatDateTime } from "~/lib/utils";
import { deleteUser } from "~/server/services/user";

export const useUserLoader = routeLoader$( 
    async ({ platform, url }) => {
        const db = await getDB(platform.env);

        const keyword = url.searchParams.get("search");
        const currentPage = parseInt(url.searchParams.get("currentPage") || '1');
        const perPage = parseInt(url.searchParams.get("perPage") || '10');
        const skipPage = currentPage >= 2 ? ((currentPage - 1) * perPage) : 0;

        if (keyword) {
            const items = await db.user.findMany({
                where: {
                    name: { contains: keyword },
                },
                skip: skipPage,
                take: perPage
            });

            const totalItem = await db.user.count({
                where: {
                    name: { contains: keyword },
                }
            });

            return { items, totalItem };
        } else {
            const items = await db.user.findMany({
                skip: skipPage,
                take: perPage
            });

            const totalItem = await db.user.count();

            return { items, totalItem };
        }
    }
);

export const useDeleteUser = routeAction$(
    async (values, { platform, request, cookie, redirect }) => {
        const { output: user, success: validUser } = v.safeParse(
            v.object({
                id: v.number(),
                avatar: v.any(),
            }), values);

        if (validUser) {
            deleteUser({ user, ...platform, request, cookie,});

            throw redirect(302, "/cms/settings/user");
        }
        
    }
);

export default component$(() => {
    const loc = useLocation();
    const navigate = useNavigate();
    const users = useUserLoader();
    const deleteUser = useDeleteUser();
    // const perPage = useSignal(10);

    const {
        handleSearchValueChange,
        handlePageChange,
        handlePerPageChange,
        // PER_PAGE,
        CURRENT_PAGE,
        TOTAL_PAGE
    } = useUsers({
        totalItems: users.value.totalItem
    });

    return (
        <>
            {/* <section class="shrink-0 h-full min-h-full w-full flex flex-col gap-6 lg:flex-row relative"> */}
                <section class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9 relative">
                <section class="no-scrollbar">
                    <Breadcrumb.Root>
                        <Breadcrumb.Item href="/cms/settings/user">
                            User management
                        </Breadcrumb.Item>

                        <Breadcrumb.Item visited>
                            User list
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>

                    <Header.Root>
                        <Header.Content>
                            <Header.Illustration 
                                src={UserIllustration}
                                alt="User Illustration"
                            />

                            <Header.Detail>
                                <Header.Headline>
                                    Manajemen User
                                </Header.Headline>

                                <Header.SupportingHeadline>
                                    Kelola akses tim Anda. Tambahkan, edit, atau nonaktifkan user berdasarkan peran (role) mereka
                                </Header.SupportingHeadline>
                            </Header.Detail>
                        </Header.Content>

                        <Header.Actions>
                            <Button
                                variant="primary"
                                size="large"
                                onClick$={() => navigate("/cms/settings/user/create")}
                            >
                                Tambah User Baru
                            </Button>
                        </Header.Actions>
                    </Header.Root>

                    <Separator />

                    <SearchBarFilter.Root>
                        <SearchBarFilter.SearchBar
                            placeholder="Cari user..."
                            value={loc.url.searchParams.get("search")}
                            valueChange$={(value) => handleSearchValueChange(value)}
                        />
                    </SearchBarFilter.Root>

                    {/* <Table.Root class="h-[500px] w-full rounded-[12px] bg-neutral-custom-base border-[1.5px] border-neutral-custom-50 border-separate border-spacing-0 overflow-hidden"> */}
                    
                    <div class="min-h-[500px] overflow-y-scroll no-scrollbar rounded-[12px] border border-neutral-custom-50">
                        <Table.Root class="w-full border-separate border-spacing-0">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Cell type="header" class="min-w-[250px]">Nama</Table.Cell>
                                    <Table.Cell type="header" class="min-w-[250px]">Username</Table.Cell>
                                    <Table.Cell type="header" class="min-w-[150px]">Role</Table.Cell>
                                    <Table.Cell type="header" class="min-w-[200px]">Dibuat</Table.Cell>
                                    <Table.Cell type="header" class="min-w-[200px]">Aksi</Table.Cell>
                                </Table.Row>
                            </Table.Head>

                            <Table.Body class="h-full w-full *:first:*:h-[166px] *:*:h-[150px] *:first:*:pt-5 *:last:*:pb-5">
                                {users.value.items.map((user) => {
                                    return (
                                        <Table.Row key={user.id}>
                                            <Table.Cell class="min-w-[250px]">
                                                { user.name }
                                            </Table.Cell>

                                            <Table.Cell class="min-w-[250px]">
                                                { user.username }
                                            </Table.Cell>

                                            <Table.Cell class="min-w-[150px]">
                                                { user.role }
                                            </Table.Cell>

                                            <Table.Cell class="min-w-[200px]">
                                                { user.created_at && (
                                                    formatDateTime(user.created_at.toISOString())
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
                                                        <Link href={`${user.id}/edit`}>
                                                            <img src={PenIcon} alt="Pen Icon" height={16} width={16} />
                                                            <p>Edit user</p>
                                                        </Link>

                                                        <div onClick$={() => deleteUser.submit(user)}>
                                                            <img src={TrashIcon} alt="Trash Icon" height={16} width={16} />
                                                            <p>Hapus user</p>
                                                        </div>
                                                    </Popover.Content>
                                                </Popover.Root>
                                            </Table.Cell>
                                        </Table.Row>     
                                    );
                                })}              
                            </Table.Body>
                        </Table.Root>
                    </div>


                    <Pagination
                        currentPage={CURRENT_PAGE.value}
                        totalPages={TOTAL_PAGE.value}
                        // perPage={PER_PAGE.value}
                        onPageChange$={(page) => handlePageChange(page.toString())}
                        onPerPageChange$={(val) => {
                            handlePerPageChange(val.toString())
                        }}
                    />
                </section>
                {/* </section> */}
            </section>
        </>
    );
});