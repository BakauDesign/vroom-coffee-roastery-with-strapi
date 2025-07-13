import { component$, useSignal } from '@builder.io/qwik';

import { Dropdown } from './dropdown';

import { Separator } from './separator';
import { UserProfile } from './user-profile';
import type { UserProfileProps } from './user-profile';

import SidebarIcon from "~/assets/Icons/Sidebar Minimalistic.svg";
import WidgetIcon from "~/assets/Icons/Widget 7.svg";
import CartIcon from "~/assets/Icons/Cart 6.svg";
import CartLargeIcon from "~/assets/Icons/Cart Large.svg";
import SettingsIcon from "~/assets/Icons/Settings.svg";
import type { Users } from '~/interfaces';

interface SidebarProps extends Omit<UserProfileProps, "user"> {
    user: Omit<Users, "id" | "username" | "password"> | null;
}

export const Sidebar = component$<SidebarProps>(({ onClickLogout$, user }) => {
    const isOpened = useSignal(false);

    return (
        <aside class={`
            shrink-0 lg:h-full flex flex-col overflow-y-scroll overflow-x-hidden no-scrollbar lg:rounded-tr-[12px] lg:rounded-br-[12px] lg:bg-neutral-custom-base font-inter transition-all duration-300 ease-in-out
            ${isOpened.value ? "w-full lg:w-[360px]" : "w-full lg:w-[100px]"} absolute lg:static bg-neutral-custom-base
            top-0 z-[99]
        `}>
            <section class={`
                    min-h-[100px] pt-6 pb-4 px-6 flex items-center justify-between gap-6 ${isOpened.value ? "flex-row lg:flex-row" : "lg:flex-col"}
                `}>
                <figure class="flex items-center gap-x-4">
                    <img 
                        src="https://i.pinimg.com/736x/53/46/0e/53460efe10e3b243a46612ec69becce0.jpg" 
                        alt="Coffee Logo"
                        class="h-[48px] w-[48px] rounded-[4px] object-cover"
                        height={48}
                        width={48}
                    />

                    <figcaption class={`text-cms-label-small ${!isOpened.value && "lg:hidden"}`}>
                        VROOM COFFEE CMS
                    </figcaption>
                </figure>

                <img 
                    src={SidebarIcon}
                    alt="Sidebar Icon"
                    onClick$={() => isOpened.value = !isOpened.value}
                    class="cursor-pointer"
                    height={24}
                    width={24}
                />
            </section>

            <Separator />

            <section class={`
                    *:px-6 flex-1 flex flex-col shrink-0 max-w-[360px] bg-neutral-custom-base transition-all duration-300 overflow-y-scroll overflow-x-hidden
                    fixed lg:static top-[120px] bottom-0 ${isOpened.value ? "translate-x-0" : "translate-x-[-360px] lg:translate-x-0"}
                `}>
                <section class="flex flex-1 py-12 flex-col gap-y-6">
                    <p class={`text-cms-label-small sm:text-cms-label-medium text-neutral-custom-800 font-medium select-none ${!isOpened.value && "lg:hidden"}`}>Menu utama</p>

                    <section class="h-full overflow-y-scroll flex flex-col gap-y-6">
                        <Dropdown.Root
                            variant="menu"
                            fillContainer
                        >
                            <Dropdown.Label>
                                <Dropdown.Icon src={WidgetIcon} />
                                <p>Dashboard</p>
                            </Dropdown.Label>
                        
                            <Dropdown.Items>
                                <Dropdown.Item href="/cms/dashboard">
                                    Statistik
                                </Dropdown.Item>
                            </Dropdown.Items>
                        </Dropdown.Root>

                        <Dropdown.Root
                            variant="menu"
                            fillContainer
                        >
                            <Dropdown.Label>
                                <Dropdown.Icon src={CartIcon} />
                                <p>Produk</p>
                            </Dropdown.Label>
                        
                            <Dropdown.Items>
                                <Dropdown.Item href="/cms/products/roasted-coffee-beans">
                                    Biji Matang (Roasted)
                                </Dropdown.Item>

                                <Dropdown.Item href="/cms/products/green-coffee-beans">
                                    Biji Mentah (Green Beans)
                                </Dropdown.Item>

                                <Dropdown.Item href="/cms/products/tools">
                                    Alat-alat
                                </Dropdown.Item>

                                <Dropdown.Item href="/cms/products/reviews">
                                    Ulasan Produk
                                </Dropdown.Item>
                            </Dropdown.Items>
                        </Dropdown.Root>

                        <Dropdown.Root
                            variant="menu"
                            fillContainer
                        >
                            <Dropdown.Label>
                                <Dropdown.Icon src={CartLargeIcon} />
                                <p>Pesanan</p>
                            </Dropdown.Label>
                        
                            <Dropdown.Items>
                                <Dropdown.Item href="/cms/orders/create">
                                    Buat Pesanan
                                </Dropdown.Item>

                                <Dropdown.Item href="/cms/orders">
                                    Daftar Pesanan
                                </Dropdown.Item>
                            </Dropdown.Items>
                        </Dropdown.Root>

                        <Dropdown.Root
                            variant="menu"
                            fillContainer
                        >
                            <Dropdown.Label>
                                <Dropdown.Icon src={SettingsIcon} />
                                <p>Pengaturan</p>
                            </Dropdown.Label>
                        
                            <Dropdown.Items>
                                <Dropdown.Item href="/cms/settings/shipping">
                                    Pengiriman
                                </Dropdown.Item>

                                <Dropdown.Item href="/cms/settings/user">
                                    Manajemen User
                                </Dropdown.Item>
                            </Dropdown.Items>
                        </Dropdown.Root>
                    </section>
                </section>

                <Separator />

                <UserProfile
                    user={user}
                    onClickLogout$={onClickLogout$} 
                    showDetail={isOpened.value}
                />
            </section>
        </aside>
    );
});