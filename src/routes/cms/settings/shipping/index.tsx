import * as v from 'valibot';

import {
    component$,
} from "@builder.io/qwik";

import { 
    Link,
    routeLoader$,
    routeAction$,
    // useLocation,
    useNavigate
} from '@builder.io/qwik-city';

import { Breadcrumb } from "~/components/cms/breadcrumb";
import { Button } from "~/components/main/button";
import { Separator } from "~/components/cms/separator";
import { Table } from "~/components/cms/table";
import { Popover } from "~/components/cms/popover";

import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";

import MenuDotsIcon from "~/assets/Icons/Menu Dots.svg";
import PenIcon from "~/assets/Icons/Pen.svg";
import TrashIcon from "~/assets/Icons/Trash Bin Trash.svg";

import ShippingIllustration from "~/assets/cms/icons/Shipping.avif";
// import { getDB } from "~/lib/db";
import { getShipping, updateShippingStatus } from '~/server/services/shipping';
import { Toggle } from "~/components/cms/toggle";

import { formatRupiah } from "~/lib/utils";

export const useShippingLoader = routeLoader$( 
    async ({ platform }) => {
        const shipping = getShipping({ ...platform });
        return shipping;
    }
);

export const useChangeShippingStatus = routeAction$(
    async (values, { platform, redirect }) => {
        const { output: shipping, success: validShipping } = v.safeParse(
            v.object({
                id: v.pipe(v.number()),
                status: v.pipe(v.boolean()),
        }), values);

        if (validShipping) {
            await updateShippingStatus({ shipping, ...platform });
            throw redirect(302, "/cms/settings/shipping")
        }
    }
)

export default component$(() => {
    const navigate = useNavigate();
    const { value: shipping } = useShippingLoader();

    const changeShippingStatus = useChangeShippingStatus();

    return (
        <>
            {/* <section class="shrink-0 h-full min-h-full w-full flex flex-col gap-6 lg:flex-row relative"> */}
                <section class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9 relative">
                <section class="no-scrollbar">
                    <Breadcrumb.Root>
                        <Breadcrumb.Item href="/cms/settings/shipping">
                            Shipping management
                        </Breadcrumb.Item>

                        <Breadcrumb.Item visited>
                            Shipping list
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>

                    <Header.Root>
                        <Header.Content>
                            <Header.Illustration 
                                src={ShippingIllustration}
                                alt="Shipping Illustration"
                            />

                            <Header.Detail>
                                <Header.Headline>
                                    Manajemen Layanan Pengiriman
                                </Header.Headline>

                                <Header.SupportingHeadline>
                                    Aktifkan atau nonaktifkan opsi pengiriman yang tersedia untuk customer. Perubahan akan langsung berlaku di website.
                                </Header.SupportingHeadline>
                            </Header.Detail>
                        </Header.Content>

                        <Header.Actions>
                            <Button
                                variant="primary"
                                size="large"
                                onClick$={() => navigate("/cms/settings/shipping/create")}
                            >
                                Tambah Pengiriman Baru
                            </Button>
                        </Header.Actions>
                    </Header.Root>

                    <Separator />
                    
                    <div class="min-h-[500px] overflow-y-scroll no-scrollbar rounded-[12px] border border-neutral-custom-50">
                        <Table.Root class="w-full border-separate border-spacing-0">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Cell type="header" class="min-w-[250px]">Nama pengiriman</Table.Cell>
                                    <Table.Cell type="header" class="min-w-[250px]">Status</Table.Cell>
                                    <Table.Cell type="header" class="min-w-[150px]">Biaya</Table.Cell>
                                    <Table.Cell type="header" class="min-w-[200px]">Aksi</Table.Cell>
                                </Table.Row>
                            </Table.Head>

                            <Table.Body class="h-full w-full *:first:*:h-[166px] *:*:h-[150px] *:first:*:pt-5 *:last:*:pb-5">
                                {shipping.data.map((shipping) => {
                                    return (
                                        <Table.Row key={shipping.id}>
                                            <Table.Cell class="min-w-[250px] flex items-center gap-x-4">
                                                <img
                                                    height={60}
                                                    width={60}
                                                    class="object-contain"
                                                    src={`https://vroom-coffee-roastery.pages.dev/media/${shipping.logo}`}
                                                    alt={`${shipping.name} Logo`}
                                                />

                                                <p>
                                                    { shipping.name }
                                                </p>
                                            </Table.Cell>

                                            <Table.Cell class="min-w-[250px]">
                                                <Toggle 
                                                    value={shipping.status}
                                                    onClick$={() => changeShippingStatus.submit(shipping)}
                                                />
                                                { shipping.status }
                                            </Table.Cell>

                                            <Table.Cell class="min-w-[150px]">
                                                { formatRupiah(shipping.cost) }
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
                                                            // href={`${shipping.id}/edit`}
                                                        >
                                                            <img src={PenIcon} alt="Pen Icon" height={16} width={16} />
                                                            <p>Edit pengiriman</p>
                                                        </Link>

                                                        <div 
                                                            // onClick$={() => deleteUser.submit(shipping)}
                                                        >
                                                            <img src={TrashIcon} alt="Trash Icon" height={16} width={16} />
                                                            <p>Hapus pengiriman</p>
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
                </section>
                {/* </section> */}
            </section>
        </>
    );
});